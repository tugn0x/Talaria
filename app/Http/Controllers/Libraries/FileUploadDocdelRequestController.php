<?php
namespace App\Http\Controllers\Libraries;
use App\Http\Controllers\ApiController;
use App\Models\References\Reference;
use App\Models\BaseTransformer;
use App\Models\Libraries\Tag;
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

class FileUploadDocdelRequestController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function UploadFile(Request $request)
    {
        try {

        //if($request->has("filehash"))
        //    Log::info(print_r( $request->get("q"), true));  
        $file_64 = $request->get("filename"); 
        //Log::info(print_r( $file_64, true));  
        $extension = explode('/', explode(':', substr($file_64, 0, strpos($file_64, ';')))[1])[1];
        $replace = substr($file_64, 0, strpos($file_64, ',')+1); 
        $file = str_replace($replace, '', $file_64); 
        $file = str_replace(' ', '+', $file); 
        $fileName = Str::random(10).'.'.$extension;
        Storage::disk('public')->put($fileName, base64_decode($file));
        } catch (ModelNotFoundException $exception) {
            return \Response::json(['data' => null, 'status'=>'failed']);
        }
        return \Response::json(['data' => $fileName, 'status'=>'uploaded', 'originalfilename'=>$request->get("uploadFile")]);
    }

    public function DownloadFile(Request $request, $id)
    {
        Log::info(print_r("id" . $id, true));  
        Log::info(print_r($request->get("q"), true));  
        $contents = Storage::disk('public')->get($request->get("q"));
        $base64content = base64_encode($contents);
        return \Response::json(['id' => $id,'filecontent' => $base64content]);
    }
}
