# Incident — 2026-09-25 scheduled run fired but published nothing and became disabled

## Summary

The normal **8:25 AM Eastern** Morning Edition scheduled task was invoked on **2026-09-25**, but no 2026-09-25 Morning Edition artifacts were committed and the task was left disabled afterward.

This was a **scheduler/execution-path failure before publication**, not an email-delivery failure.

## Verified evidence

- Scheduled task: `Morning Edition`
- Intended schedule: daily at 8:25 AM Eastern
- Recorded last run: `2026-09-25T12:25:47Z` (08:25:47 EDT)
- Recorded task update shortly afterward: `2026-09-25T12:26:52Z`
- Task state after the failed run: disabled
- `data/latest.json` still contained the **2026-09-24** edition
- No 2026-09-25 publication commits existed in `BigCatMellow/Morning_Edition`
- `BigCatMellow/Notes/data/morning-edition-trigger.txt` still contained the **2026-09-24** date and timestamp

Because the downstream email trigger did not move, no stale or incomplete email was sent. That safety behavior was correct.

## Root-cause status

The exact platform-level exception from the scheduled execution is **UNKNOWN** on the available task surface. The scheduler exposes that the run occurred and that the task ended disabled, but it does not expose a detailed execution exception here.

Do not invent a more specific root cause unless future platform logs or reproducible evidence establish one.

What is established is:

1. the scheduler invocation happened;
2. publication never reached the first Morning Edition repository commit;
3. the task did not remain enabled afterward;
4. the publication/email gates behaved safely.

## Failure class

**Pre-publication scheduled-execution failure with scheduler disablement.**

This is materially different from prior incidents involving malformed publication data after files had already been written.

## Corrective actions

1. Re-enable the primary `Morning Edition` task at 8:25 AM Eastern.
2. Add explicit task instructions that a publication failure must **not** intentionally disable or alter the recurring scheduler.
3. Keep the existing publication gate: never advance the Notes email trigger until all Morning Edition artifacts validate.
4. Add an independent daily recovery task after the primary run:
   - inspect `data/latest.json`;
   - if its `date` is already today in Eastern Time, exit without publishing or sending;
   - if today's edition is missing, execute the canonical repository workflow and publish it;
   - advance the email trigger only after all normal validation gates pass.
5. Use the repository, not task memory, as the recovery task's source of truth.
6. Keep primary and recovery paths idempotent by using today's published date as the guard.

## Why the recovery task is separate

A watchdog inside the same scheduled execution cannot protect against that execution failing before its recovery logic runs. A second scheduled execution creates an independent failure boundary.

The recovery task is not a second normal publisher. It is a conditional catch-up path and must do nothing when today's edition already exists.

## Operator check after any future miss

Check in this order:

1. Did the 8:25 task record a run?
2. Is the primary task still enabled?
3. Does `data/latest.json` have today's Eastern date?
4. Do all four dated publication artifacts exist?
5. Did the Notes trigger move only after validation?
6. Did the recovery task run if the primary publication was missing?

If the primary task repeatedly becomes disabled, treat that as a platform/scheduler reliability issue rather than compensating by weakening publication validation.

## Acceptance criteria for the fix

- Primary daily schedule is enabled.
- Independent recovery schedule is enabled.
- Both use the repo runbook and protocols as source of truth.
- Recovery exits cleanly when today's edition exists.
- Recovery publishes only when today's edition is missing.
- Email remains downstream of successful validated publication.
- This incident is linked from `OPERATIONS_RUNBOOK.md`.
