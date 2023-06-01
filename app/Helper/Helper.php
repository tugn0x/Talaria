<?php
namespace App\Helper;

class Helper{
  public static function import_CSV($filename, $delimiter = ','){
    if(!file_exists($filename) || !is_readable($filename))
    return false;
    $header = null;
    $data = array();
    if (($handle = fopen($filename, 'r')) !== false){
      while (($row = fgetcsv($handle, 1000, $delimiter)) !== false){
        if(!$header)
          $header = $row;
        else
          $data[] = array_combine($header, $row);
       }
       fclose($handle);
    }
    return $data;
  }

  public static function convertCoordinateToDecimal($coordinates)
  {

      $trimmedCoordinates = str_replace(' ', '', $coordinates);

      // Split the coordinate into degrees, minutes, seconds, and direction
      preg_match('/^(\d+)°(\d+)\'(\d+)\'\'([NSWE])$/', $trimmedCoordinates, $matches);

      
      if (count($matches) !== 5) {
          throw new \Exception("Invalid coordinate format: $trimmedCoordinates");
      }

      $degrees = (int) $matches[1];
      $minutes = (int) $matches[2];
      $seconds = (int) $matches[3];
      $direction = $matches[4];

      $decimal = $degrees + ($minutes / 60) + ($seconds / 3600);

      // Adjust the decimal value based on the direction
      if ($direction === 'S' || $direction === 'W') {
          $decimal *= -1;
      }

      return $decimal;
  }

}