<?php

namespace App\Helper;

use Illuminate\Http\Request;

class ImageHelper
{
    /**
     * Upload an image file.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $imageFieldName
     * @return string|null
     * 
     * $imageUrl = ImageHelper::uploadImage($request, 'gambar_gedung', 'gedung/gambar_gedung');
     */
    public static function uploadImage(Request $request, $imageFieldName, $path)
    {
        if ($request->hasFile($imageFieldName)) {
            $image = $request->file($imageFieldName);
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $imagePath = $image->storeAs($path, $imageName, 'public');
            $imageUrl = asset('storage/'.$imagePath);
            return $imageUrl;
        }
        return null;
    }

    // example load Function $imageUrl = ImageHelper::deleteImage($path);
    public static function deleteImage($path)
    {
        $parts = explode('/storage/', $path);
        $pathAfterStorage = $parts[1];
        if (file_exists(public_path("storage/$pathAfterStorage"))) {
            unlink(public_path("storage/$pathAfterStorage"));
        }
    }
}
