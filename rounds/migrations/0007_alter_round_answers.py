# Generated by Django 5.0.2 on 2024-02-19 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rounds', '0006_remove_round_answers_visible_round_answers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='round',
            name='answers',
            field=models.CharField(max_length=255, null=True),
        ),
    ]