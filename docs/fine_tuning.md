# Fine-Tuning StudyPilot

StudyPilot can use a locally fine-tuned tutor model instead of relying only on prompt grounding.

## 1. Export training data

Build a JSONL dataset from the imported syllabus tree and knowledge table:

```bash
python scripts/export_tutor_dataset.py --output data/tutor_training.jsonl
```

The exporter writes:

- `data/tutor_training.jsonl`
- `data/tutor_training_manifest.json`

## 2. Install training dependencies

The training script expects:

- `torch`
- `transformers`
- `datasets`
- `peft`

## 3. Train a LoRA adapter

```bash
python scripts/train_tutor_lora.py --dataset data/tutor_training.jsonl --merge
```

By default, the script starts from:

- `TinyLlama/TinyLlama-1.1B-Chat-v1.0`

You can change the base model with `--base-model`.

## 4. Link the model back into StudyPilot

If you trained a Hugging Face model directory, point the backend at it:

```bash
set STUDYPILOT_LLM_PROVIDER=transformers
set STUDYPILOT_LLM_MODEL_PATH=C:\Ishaan\SchoolPilot\models\studypilot-tutor-lora\merged
```

If you instead convert the result into an Ollama model, use:

```bash
set STUDYPILOT_LLM_PROVIDER=ollama
set STUDYPILOT_OLLAMA_MODEL=your-fine-tuned-model-name
```

## Notes

- The exporter learns from both `knowledge_entries` and `syllabus_nodes`, so the dataset grows as the syllabus import gets more complete.
- The tutor keeps calculator handling and offline syllabus fallback, so it stays usable even if the fine-tuned model is missing.
