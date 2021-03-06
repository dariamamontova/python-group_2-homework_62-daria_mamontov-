# Generated by Django 2.1.7 on 2019-03-04 13:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0003_hall'),
    ]

    operations = [
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('row', models.IntegerField(blank=True, null=True)),
                ('seat', models.IntegerField(blank=True, null=True)),
                ('hall', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='seats', to='webapp.Hall', verbose_name='Hall')),
            ],
        ),
    ]
