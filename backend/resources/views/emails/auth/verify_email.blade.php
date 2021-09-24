@component('mail::message')
# Email Verification  

Hello, **{{$username}}**  
We are from {{ config('app.name') }}. Use this code below to verify your email.  
  
<h1 style="color: #3d4852;">{{$code}}</h1>  
  
This code is expires at next **15mn**.  
If you did not make this request, you can ignore this notification.  

Thanks,  
{{ config('app.name') }}
@endcomponent
