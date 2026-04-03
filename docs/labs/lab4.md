# Лабораторная работа №4: Классификация с применением Scikit-Learn

[Исходник](https://colab.research.google.com/drive/1H3FqLk8ayyWFajiuKYAX6pjfUYwQbRUg?usp=sharing)

## Самостоятельное задание

### Почему это лучший способ
Разные бустинги ошибаются в разных местах. Стек учится на их ошибках и комбинирует сильные стороны, давая результат стабильнее любого из них по отдельности.
### Метрики
    - ROC-AUC на тестовой выборке: 0.8659540695371185
    - Accuracy score: 0.93592
### Код
```python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from catboost import CatBoostClassifier

params = {
    'objective': 'binary',
    'metric': 'auc',
    'boosting_type': 'gbdt',
    'num_leaves': 31,
    'learning_rate': 0.03,
    'feature_fraction': 0.8,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
    'reg_alpha': 0.1,
    'reg_lambda': 0.1,
    'scale_pos_weight': 5,  # вес класса дефолт (если 1:5)
    'verbose': -1,
    'seed': 42
}


estimators = [
    ('lgb', lgb.LGBMClassifier(**params)),
    ('xgb', XGBClassifier(scale_pos_weight=5, use_label_encoder=False)),
    ('cat', CatBoostClassifier(verbose=0, auto_class_weights='Balanced'))
]

stack_model = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(C=1.0),
    cv=5,
    passthrough=False  # не передавать сырые признаки в мета-модель
)
```
