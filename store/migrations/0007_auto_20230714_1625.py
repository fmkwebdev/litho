# Generated by Django 3.0.3 on 2023-07-14 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_auto_20230714_1605'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='images/')),
            ],
        ),
        migrations.DeleteModel(
            name='UserPic',
        ),
    ]