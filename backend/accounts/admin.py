from django.contrib import admin
from .models import UserAccount
from forstaelse.models import Forstaelse

# Register your models here.
class AccountAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_staff', 'is_active', 'is_superuser')
    search_fields = ('email', 'name')

class ForstaelseAdmin(admin.ModelAdmin):
    list_display = ('chat', 'question', 'answer', 'explanation')

admin.site.register(UserAccount, AccountAdmin)
admin.site.register(Forstaelse, ForstaelseAdmin)