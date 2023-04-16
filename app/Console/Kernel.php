<?php
//To debug scheduled job you can use: php artisan schedule:run 
//Every job is automatically added to queue (based on schedule) but in order to be runned you need an active WORKER
//To start worker: php artisan queue:work 
//in a production server you may need to add sheduler to a crontab like:
//* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
//and run php artisan queue:work regularly using supervisor (to check if worker is still alive) 

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\AutomaticCleanDDRequests;
use App\Jobs\AutomaticDeleteUploadedFiles;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    protected function scheduleTimezone()
    {
        return env('TIMEZONE');
    }

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {        
        $schedule->job(new AutomaticCleanDDRequests)->everyFiveMinutes()->withoutOverlapping();
        $schedule->job(new AutomaticDeleteUploadedFiles)->dailyAt('23:00')->withoutOverlapping();            
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
