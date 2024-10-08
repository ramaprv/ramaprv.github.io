---
title: Building a Model Registry from Scratch & Model Evaluation
tags: [Machine Learning, PyTorch, Python]
style: fill
color: success
description: This blog post dives into the essentials of model evaluation using PyTorch and the process of creating a custom model registry.
---

# Model Evaluation with PyTorch and Building a Model Registry from Scratch

When working with machine learning models, the process doesn’t end with training. Evaluating models and keeping track of them is equally important, especially when working in production environments. In this post, we’ll explore how to evaluate a model using PyTorch and build a custom model registry from scratch to version and manage models efficiently.

## Prerequisites

- Basic understanding of machine learning concepts.
- Familiarity with PyTorch.
- Python 3.x installed.

---

## 1. Model Evaluation with PyTorch

Model evaluation is essential for understanding how well a trained model generalizes to unseen data. PyTorch provides flexibility in designing evaluation pipelines. Let’s start with a few common metrics like accuracy, precision, recall, and F1-score.

### Code for Evaluating a Model

Below is an example of evaluating a simple classification model in PyTorch:

```python
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Assuming model, test_loader, and device are already defined
model.eval()  # Set model to evaluation mode

all_preds = []
all_labels = []

# Disable gradient calculations for faster computations
with torch.no_grad():
    for inputs, labels in test_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        
        # Forward pass
        outputs = model(inputs)
        _, preds = torch.max(outputs, 1)
        
        all_preds.extend(preds.cpu().numpy())
        all_labels.extend(labels.cpu().numpy())

# Calculate evaluation metrics
accuracy = accuracy_score(all_labels, all_preds)
precision = precision_score(all_labels, all_preds, average='weighted')
recall = recall_score(all_labels, all_preds, average='weighted')
f1 = f1_score(all_labels, all_preds, average='weighted')

print(f"Accuracy: {accuracy:.4f}, Precision: {precision:.4f}, Recall: {recall:.4f}, F1-Score: {f1:.4f}")
```

This code evaluates a trained model on a test dataset and calculates standard metrics to understand model performance.

---

## 2. Building a Model Registry from Scratch

Managing models in production becomes complicated when there are multiple versions to keep track of. A model registry provides a way to store models, version them, and retrieve them when needed. While tools like MLflow exist for this purpose, we’ll walk through building a simple custom model registry using Python and `pickle`.

### Structure of the Model Registry

The model registry consists of:

- A directory to store models.
- A metadata file (e.g., JSON) to keep track of model versions and performance metrics.
  
### Step-by-Step Implementation

#### Step 1: Directory Structure

The following directory structure will help organize models:

```
model_registry/
│
├── models/
│   ├── model_v1.pkl
│   ├── model_v2.pkl
│
└── registry.json
```

#### Step 2: Code for Model Registry

```python
import os
import json
import pickle

class ModelRegistry:
    def __init__(self, registry_dir="model_registry"):
        self.registry_dir = registry_dir
        self.models_dir = os.path.join(self.registry_dir, "models")
        self.registry_file = os.path.join(self.registry_dir, "registry.json")
        
        os.makedirs(self.models_dir, exist_ok=True)
        
        if not os.path.exists(self.registry_file):
            with open(self.registry_file, 'w') as f:
                json.dump({}, f)
        
    def save_model(self, model, model_name, metrics):
        # Save the model
        version = self.get_next_version(model_name)
        model_path = os.path.join(self.models_dir, f"{model_name}_v{version}.pkl")
        with open(model_path, 'wb') as f:
            pickle.dump(model, f)
        
        # Update registry
        self.update_registry(model_name, version, model_path, metrics)
        print(f"Model {model_name} version {version} saved successfully!")
    
    def update_registry(self, model_name, version, model_path, metrics):
        with open(self.registry_file, 'r') as f:
            registry = json.load(f)
        
        if model_name not in registry:
            registry[model_name] = []
        
        registry[model_name].append({
            "version": version,
            "path": model_path,
            "metrics": metrics
        })
        
        with open(self.registry_file, 'w') as f:
            json.dump(registry, f, indent=4)
    
    def get_next_version(self, model_name):
        with open(self.registry_file, 'r') as f:
            registry = json.load(f)
        
        if model_name not in registry:
            return 1
        else:
            return len(registry[model_name]) + 1
    
    def load_model(self, model_name, version=None):
        with open(self.registry_file, 'r') as f:
            registry = json.load(f)
        
        if model_name not in registry:
            raise ValueError(f"Model {model_name} not found in the registry")
        
        if version is None:
            version = len(registry[model_name])  # Load latest version
        
        model_info = next((m for m in registry[model_name] if m['version'] == version), None)
        
        if model_info is None:
            raise ValueError(f"Version {version} of model {model_name} not found")
        
        with open(model_info['path'], 'rb') as f:
            model = pickle.load(f)
        
        return model
```

#### Step 3: Saving and Loading Models

Now, let's demonstrate how to use this registry to save and load models.

```python
# Assuming `trained_model` is the trained PyTorch model and `metrics` is the evaluation result
registry = ModelRegistry()

# Save the model and metrics
metrics = {"accuracy": 0.92, "precision": 0.89, "recall": 0.88, "f1_score": 0.89}
registry.save_model(trained_model, "my_classification_model", metrics)

# Load the latest version of the model
loaded_model = registry.load_model("my_classification_model")
```

---

## 3. Visualizing the Evaluation Metrics

It is helpful to visualize the evaluation metrics to provide a clearer picture of model performance. Below is a code snippet to visualize these metrics using matplotlib:

```python
import matplotlib.pyplot as plt

metrics = ['Accuracy', 'Precision', 'Recall', 'F1-Score']
values = [accuracy, precision, recall, f1]

plt.bar(metrics, values, color=['blue', 'orange', 'green', 'red'])
plt.title("Model Evaluation Metrics")
plt.ylim(0, 1)
plt.ylabel("Score")
plt.show()
```

![](https://github.com/user-attachments/assets/df923d05-7507-4b02-808a-8184abcc14ed)


In machine learning, **Accuracy**, **Precision**, **Recall**, and the **F1-Score** are key metrics used to evaluate the performance of classification models:

1. **Accuracy**: Measures the proportion of correctly predicted instances out of the total instances. It is best used when the classes are balanced but can be misleading for imbalanced datasets.

   \[
   \text{Accuracy} = \frac{\text{True Positives (TP)} + \text{True Negatives (TN)}}{\text{Total Instances}}
   \]

2. **Precision**: Focuses on the quality of positive predictions, i.e., the proportion of true positive predictions out of all positive predictions (both true and false). High precision means fewer false positives.

   \[
   \text{Precision} = \frac{\text{True Positives (TP)}}{\text{True Positives (TP)} + \text{False Positives (FP)}}
   \]

3. **Recall (Sensitivity or True Positive Rate)**: Measures the ability to capture all actual positive instances, i.e., the proportion of true positives identified out of all actual positives. High recall means fewer false negatives.

   \[
   \text{Recall} = \frac{\text{True Positives (TP)}}{\text{True Positives (TP)} + \text{False Negatives (FN)}}
   \]

4. **F1-Score**: The harmonic mean of Precision and Recall, providing a balance between them. It is especially useful when dealing with imbalanced classes.

   \[
   \text{F1-Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}
   \]

These metrics are used to assess how well a model distinguishes between different classes, with Precision being useful when false positives are costly, Recall when missing positives is critical, and F1-Score offering a balanced measure.

---

## Conclusion

In this blog post, we explored how to evaluate machine learning models using PyTorch and built a simple model registry from scratch. Evaluating models with proper metrics is key to understanding their generalization capabilities, while a registry helps in versioning and managing models efficiently. You can expand this setup with additional features like storing more metadata or integrating with cloud services for model storage.

Stay tuned for future posts on automating model evaluation and deployment in production environments!