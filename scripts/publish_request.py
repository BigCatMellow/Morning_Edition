#!/usr/bin/env python3
import base64, json, os, re, subprocess, sys, urllib.request
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

TZ=ZoneInfo("America/New_York")
REPO=Path(".")
NOTES_REPO="BigCatMellow/Notes"
TRIGGER_PATH="data/morning-edition-trigger.txt"

def fail(msg):
    raise RuntimeError(msg)

def run(*args):
    subprocess.run(args,check=True)

def extract(body):
    m=re.search(r"<!-- MORNING_EDITION_PACKAGE\\n(.*?)\\nMORNING_EDITION_PACKAGE -->",body or "",re.S)
    if not m: fail("Missing MORNING_EDITION_PACKAGE envelope")
    try: return json.loads(base64.b64decode(m.group(1).strip()).decode("utf-8"))
    except Exception as e: fail(f"Invalid package encoding: {e}")

def markdown(e):
    out=[f"# Morning Edition — {datetime.fromisoformat(e['date']).strftime('%B %-d, %Y')}","",e.get("dek",""),"","## Lead Story","",f"### {e['lead_story']['headline']}",e['lead_story'].get('summary',''),"",f"**Why it matters:** {e['lead_story'].get('why_it_matters','')}","",f"*{e['lead_story'].get('source','')} — {e['lead_story'].get('published_date','')}*",""]
    for s in e.get("sections",[]):
        out += [f"## {s.get('title','Section')}",""]
        for i in s.get("items",[]):
            out += [f"### {i['headline']}",i.get("summary",""),"",f"**Why it matters:** {i.get('why_it_matters','')}","",f"*{i.get('source','')} — {i.get('published_date','')}*",""]
    out += ["## Worth Your Time",""]
    for i in e.get("worth_your_time",[]):
        out += [f"### {i['headline']}",i.get("summary",""),"",f"**Why it matters:** {i.get('why_it_matters','')}","",f"*{i.get('source','')} — {i.get('published_date','')}*",""]
    return "\n".join(out).rstrip()+"\n"

def validate(p):
    if p.get("package_version")!=1: fail("Unsupported package_version")
    e,r=p.get("edition"),p.get("readers")
    if not isinstance(e,dict) or not isinstance(r,dict): fail("edition/readers must be objects")
    today=datetime.now(TZ).date().isoformat()
    if e.get("date")!=today: fail(f"Edition date {e.get('date')} != Eastern today {today}")
    if r.get("date")!=today: fail("Reader-pack date mismatch")
    if e.get("generated_at")!=r.get("generated_at"): fail("generated_at mismatch")
    stories=[e.get("lead_story")]+[i for s in e.get("sections",[]) for i in s.get("items",[])]+e.get("worth_your_time",[])
    if any(not isinstance(x,dict) for x in stories): fail("Malformed visible story")
    urls=[x.get("url") for x in stories]
    if any(not u for u in urls) or len(urls)!=len(set(urls)): fail("Visible canonical URLs are missing or duplicated")
    for x in stories:
        d=x.get("published_date")
        if d is not None and not re.fullmatch(r"\\d{4}-\\d{2}-\\d{2}",str(d)): fail("Invalid published_date")
    ideas=[i.get("url") for s in e.get("sections",[]) if s.get("id")=="ideas" for i in s.get("items",[])]
    wyt={i.get("url") for i in e.get("worth_your_time",[])}
    if any(u in wyt for u in ideas): fail("Ideas article duplicated in Worth Your Time")
    readers=r.get("readers")
    if not isinstance(readers,dict): fail("Reader-pack readers object missing")
    for x in stories:
        if x.get("selection_lane")!="human-scale" and x.get("url") not in readers: fail(f"Reader linkage missing: {x.get('url')}")
    review=e.get("editorial_review") or {}
    required=["section_uniqueness_check","human_scale_stakes_check","triangulation_check","contextualization_check"]
    for k in required:
        if not str(review.get(k,"")).lower().startswith("pass"): fail(f"Editorial gate not passed: {k}")
    return e,r,today

def api(url,token,method="GET",data=None):
    req=urllib.request.Request(url,method=method,headers={"Authorization":f"Bearer {token}","Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"})
    if data is not None:
        req.data=json.dumps(data).encode(); req.add_header("Content-Type","application/json")
    with urllib.request.urlopen(req,timeout=30) as resp: return json.load(resp)

def update_trigger(date,generated):
    token=(os.getenv("NOTES_TRIGGER_TOKEN") or "").strip()
    if not token: fail("NOTES_TRIGGER_TOKEN is not configured; edition files were published but email trigger cannot be advanced")
    url=f"https://api.github.com/repos/{NOTES_REPO}/contents/{TRIGGER_PATH}"
    cur=api(url,token)
    content=f"{date}\\n{generated}"
    api(url,token,"PUT",{"message":f"Trigger Morning Edition {date}","content":base64.b64encode(content.encode()).decode(),"sha":cur["sha"]})

def main():
    p=extract(os.getenv("ISSUE_BODY",""))
    e,r,date=validate(p)
    latest=REPO/"data/latest.json"
    if latest.exists():
        current=json.loads(latest.read_text())
        if current.get("date")==date:
            print("Today's edition already exists; no publication or trigger change.")
            return
    files={
      "data/latest.json":json.dumps(e,separators=(",",":"),ensure_ascii=False),
      f"data/archive/{date}.json":json.dumps(e,separators=(",",":"),ensure_ascii=False),
      f"data/readers/{date}.json":json.dumps(r,separators=(",",":"),ensure_ascii=False),
      f"editions/{date}.md":markdown(e),
    }
    for path,content in files.items():
        q=REPO/path; q.parent.mkdir(parents=True,exist_ok=True); q.write_text(content,encoding="utf-8")
    # Persist all four publication files in one atomic repository commit.
    run("git","config","user.name","github-actions[bot]")
    run("git","config","user.email","41898282+github-actions[bot]@users.noreply.github.com")
    run("git","add",*files.keys())
    run("git","commit","-m",f"Publish Morning Edition {date}")
    run("git","push","origin","HEAD:main")
    # Re-read the committed representation and repeat critical linkage/equality gates.
    archived=json.loads((REPO/f"data/archive/{date}.json").read_text())
    persisted=json.loads((REPO/"data/latest.json").read_text())
    persisted_r=json.loads((REPO/f"data/readers/{date}.json").read_text())
    if persisted!=archived: fail("Persisted archive/latest mismatch")
    validate({"package_version":1,"edition":persisted,"readers":persisted_r})
    if not (REPO/f"editions/{date}.md").read_text().startswith("# Morning Edition — "): fail("Persisted markdown validation failed")
    # Separate cross-repository commit. This push triggers the existing Notes email workflow.
    update_trigger(date,e["generated_at"])
    print(f"Published and triggered Morning Edition {date}")

if __name__=="__main__":
    try: main()
    except Exception as e:
        print(f"ERROR: {e}",file=sys.stderr); sys.exit(1)
