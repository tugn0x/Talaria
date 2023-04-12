<?php
//To run this we have to put in cron like
//* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
//to check if some jobs is in queue:  php artisan queue:list

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
        $schedule->job(new AutomaticCleanDDRequests)->everyFiveMinutes()->withoutOverlapping()->runInBackground();
        $schedule->job(new AutomaticDeleteUploadedFiles)->dailyAt('23:00')->withoutOverlapping()->runInBackground();
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
