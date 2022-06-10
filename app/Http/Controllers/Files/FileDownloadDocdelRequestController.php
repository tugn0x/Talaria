<?php
namespace App\Http\Controllers\Files;
use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\BaseTransformer;
use App\Models\Requests\DocdelRequest;
use App\Models\Requests\DocdelRequestTransformer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use File;
use Response;

class FileDownloadDocdelRequestController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function DownloadFile(Request $request)
    {
        Log::info(print_r($request->get("q"), true));  
        $contents = Storage::disk('public')->get($request->get("q"));
        $base64content = base64_encode($contents);
        //return \Response::json(['id' => $id,'filecontent' => $base64content]);
        return \Response::json(['filecontent' => $base64content]);
    }
}