# Schemas

JSON structures used by the skill-creator evaluation loop.

## evals.json

Stored at `<skill>/evals/evals.json`. The master list of test prompts.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's task prompt",
      "expected_output": "Description of expected result",
      "files": [],
      "assertions": []
    }
  ]
}
```

- `files` — input files to provide to the run (relative paths).
- `assertions` — added later while runs are in progress. Each assertion:

```json
{
  "name": "produces a CSV with a header row",
  "description": "The output CSV must start with a header containing the exact column names",
  "check": "text_contains",
  "value": "timestamp,sensor,value"
}
```

Supported `check` values: `text_contains`, `file_exists`, `json_schema`,
`exit_code`.

## eval_metadata.json

Stored per eval directory in an iteration workspace:

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name-here",
  "prompt": "The user's task prompt",
  "assertions": []
}
```

`assertions` mirrors the entries from `evals.json` once drafted.

## timing.json

Stored per run directory (`<workspace>/iteration-N/<eval>/<run>/timing.json`).
Captured from the task notification — it is not available anywhere else.

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

## grading.json

Stored per run directory. Produced by the grader subagent.

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name-here",
  "expectations": [
    {
      "text": "the assertion description (human readable)",
      "passed": true,
      "evidence": "outputs/report.csv:2 header row matches"
    }
  ]
}
```

The `expectations` entries MUST use exactly the fields `text`, `passed`, and
`evidence`. The viewer and benchmark depend on these names. Do not use
`name`/`met`/`details`.

## benchmark.json

Produced by `scripts/aggregate_benchmark.py`.

```json
{
  "skill_name": "example-skill",
  "configs": [
    {
      "name": "with_skill",
      "pass_rate": 0.75,
      "passed": 3,
      "total": 4,
      "tokens": {"mean": 84852, "stddev": 2311},
      "duration_ms": {"mean": 23332, "stddev": 4102},
      "evals": [
        {"eval_name": "descriptive-name-here", "passed": 1, "total": 1, "tokens": 84852, "duration_ms": 23332}
      ]
    }
  ],
  "delta": {
    "with_skill_vs_without_skill": {"pass_rate": 0.25, "tokens": 12000, "duration_ms": 5000}
  }
}
```

`with_skill` must come before its baseline counterpart. `delta` is
`first_config - other_config` for each numeric field.

## feedback.json

Produced when the user clicks "Submit All Reviews" in the viewer.

```json
{
  "reviews": [
    {"run_id": "eval-0-with_skill", "feedback": "the chart is missing axis labels", "timestamp": "..."}
  ],
  "status": "complete"
}
```

Empty `feedback` means the user was satisfied.

## Trigger eval set (description optimization)

```json
[
  {"query": "the user prompt", "should_trigger": true},
  {"query": "another prompt", "should_trigger": false}
]
```

Stored as `trigger-eval.json` in the skill workspace. 20 queries, mix of
should-trigger (8-10) and should-not-trigger (8-10), focused on near-misses
rather than obvious cases.
