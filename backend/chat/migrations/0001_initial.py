# Generated by Django 3.1.6 on 2021-03-07 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chatquestion1', models.CharField(max_length=1000)),
                ('answer11', models.CharField(max_length=1000)),
                ('answer12', models.CharField(max_length=1000)),
                ('correctanswer1', models.CharField(max_length=1000)),
                ('chatquestion2', models.CharField(max_length=1000)),
                ('answer21', models.CharField(max_length=1000)),
                ('answer22', models.CharField(max_length=1000)),
                ('correctanswer2', models.CharField(max_length=1000)),
                ('chatquestion3', models.CharField(max_length=1000)),
                ('answer31', models.CharField(max_length=1000)),
                ('answer32', models.CharField(max_length=1000)),
                ('correctanswer3', models.CharField(max_length=1000)),
            ],
        ),
    ]
