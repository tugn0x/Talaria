@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
{{ $greeting }}
@endif
{{--@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('Hello!')
@endif
--}}

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
    switch ($level) {
        case 'success':
        case 'error':
            $color = $level;
            break;
        default:
            $color = 'primary';
    }
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('email.regards'),
<br/>{{ config('app.name') }}
@endif

{{-- Subcopy --}}
{{--@slot('subcopy')--}}
@isset($actionText)
@lang(
    'email.link_trouble',
    [
        'actionText' => $actionText,
        'actionURL' => $actionUrl,
    ]
)
{{--@endslot--}}
@endisset
@endcomponent
