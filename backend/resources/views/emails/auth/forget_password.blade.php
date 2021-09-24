@component('mail::message')
# Forget Password

Hello, **{{$username}}**  
We are from chatcha. We received your request to reset password of your account. Click the button below to reset your password.  

@component('mail::button', ['url' => $url])
click here for reset password
@endcomponent

This email is expires at next **15mn**.  
If you did not make this request, you can ignore this notification.  

Thanks,  
{{ config('app.name') }}
@endcomponent
