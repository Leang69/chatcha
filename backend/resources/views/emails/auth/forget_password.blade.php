@component('mail::message')
# Forget Password

Did you forget your password?

@component('mail::button', ['url' => $url])
click here for reset password
@endcomponent

This email is expires at next 15mn ( {{now()->addMinute(15)}} )<br>
If you did not make this request, you can ignore this notification.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
