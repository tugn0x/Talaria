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

class FileUploadDocdelRequestController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function UploadFile(Request $request)
    {
        try {
            $file_64 = $request->get("filename"); 
            $size_in_bytes = (int) (strlen(rtrim($file_64, '=')) * 3 / 4);
            $size_in_kb    = $size_in_bytes / 1024;
            $size_in_mb    = $size_in_kb / 1024;

            $variable = env("MAX_UPLOAD_FILE", "100");
            //Log::info(print_r($variable,true));

                if ($size_in_mb <= $variable)
                {
                    $extension = explode('/', explode(':', substr($file_64, 0, strpos($file_64, ';')))[1])[1];
                    $replace = substr($file_64, 0, strpos($file_64, ',')+1); 
                    $file = str_replace($replace, '', $file_64); 
                    $file = str_replace(' ', '+', $file); 
                    $fileName = Str::random(10).'.'.$extension;
                    Storage::disk('public')->put($fileName, base64_decode($file));
                }
                else
                    return \Response::json(['data' => null, 'status'=>'The Uploaded File Exceeds the defined upload_max_filesize']);

            } catch (ModelNotFoundException $exception) {
                return \Response::json(['data' => null, 'status'=>'failed']);
            }
            return \Response::json(['data' => $fileName, 'status'=>'uploaded', 'originalfilename'=>$request->get("uploadFile")]);
        }
    }
        

