from django.db import models
from accounts.models import UserAccount


"""
 @author Phajsi, Julie
 This is the model for the rydde_setninger exercise. It determines all the fields and the constraints.
 Each rydde_setninger exercise may have up to 3 tasks, but only 1 is required.
 In addition to the task-specific fields, each exercise needs an owner which is a foreign key
 related to the account model.
"""


class RyddeSetninger(models.Model):
    WORD_CLASSES = (
        ('n', 'Substantiv'),
        ('v', 'Verb'),
        ('adj', 'Adjektiv'),
        ('adv', 'Adverb'),
        ('prp', 'Preposisjon'),
        ('conj', 'Konjuksjon'),
        ('subj', 'Subjuksjon'),
        ('det', 'Determinativ'),
        ('pron', 'Pronomen'),
        ('intj', 'Interjeksjon')
    )

    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    word1 = models.CharField(max_length=20)
    wordClass1 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word2 = models.CharField(max_length=20)
    wordClass2 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word3 = models.CharField(max_length=20)
    wordClass3 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word4 = models.CharField(max_length=20, blank=True)
    wordClass4 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word5 = models.CharField(max_length=20, blank=True)
    wordClass5 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word6 = models.CharField(max_length=20, blank=True)
    wordClass6 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word7 = models.CharField(max_length=20, blank=True)
    wordClass7 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word8 = models.CharField(max_length=20, blank=True)
    wordClass8 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word9 = models.CharField(max_length=20, blank=True)
    wordClass9 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)

    word10 = models.CharField(max_length=20, blank=True)
    wordClass10 = models.CharField(
        max_length=12, choices=WORD_CLASSES, blank=True)
