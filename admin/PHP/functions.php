<?php
function basic_modal()
{
    return '
    <div id="modalINFO" class="modal">
        <div id="modal-contentINFO"> 
        </div>
        <div class="modal-footer">
        </div>
    </div>
    ';
}
function resize_image($file, $w, $h, $crop = FALSE)
{
    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width - ($width * abs($r - $w / $h)));
        } else {
            $height = ceil($height - ($height * abs($r - $w / $h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w / $h > $r) {
            $newwidth = $h * $r;
            $newheight = $h;
        } else {
            $newheight = $w / $r;
            $newwidth = $w;
        }
    }
    $mime_type = mime_content_type($file);
    switch ($mime_type) {
        case 'image/jpeg':
        case 'image/jpg':
            $src = imagecreatefromjpeg($file);
            break;
        case 'image/png':
            $src = imagecreatefrompng($file);
            break;
        case 'image/gif':
            $src = imagecreatefromgif($file);
            break;
    }
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
}


function save_image($id, $file, $whereToSave)
{
    $directory_size = 20;
    $checker = $id / $directory_size;
    $checker = ceil($checker);
    $checker--;
    $movedir = $whereToSave;
    $movedir .= $checker . "/";
    if (!file_exists($movedir)) {
        mkdir($movedir, 0777, true);
    }
    $name = $id . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
    /*echo $name;
        echo $file['name']."<br>";
        echo $file['tmp_name']."<br>";
        echo $file['size']."<br>";
        echo $file['error']."<br>";*/
    if (move_uploaded_file($file['tmp_name'], $movedir . $name)) {
        $return = $checker . "/" . $name;
        return $return;
    } else {
        return 'nope';
    }
}
function store_uploaded_image($id, $html_element_name, $new_img_width, $new_img_height)
{
    $directory_size = 20;
    $checker = $id / $directory_size;
    $checker = ceil($checker);
    $checker--;
    $movedir = "../imgResized/";
    $movedir .= $checker . "/";
    if (!file_exists($movedir)) {
        mkdir($movedir, 0777, true);
    }
    $name = $id . '.' . pathinfo($_FILES[$html_element_name]['name'], PATHINFO_EXTENSION);
    $target_file = $movedir . $name;

    $image = new SimpleImage();
    $image->load($_FILES[$html_element_name]['tmp_name']);
    if ($image->getWidth() > $new_img_width or $image->getHeight() > $new_img_height) {
        $image->resizeToHeight($new_img_width, $new_img_height);
        $image->resizeToWidth($new_img_width, $new_img_height);
    }
    $image->save($target_file);
    return $target_file; //return name of saved file in case you want to store it in you database or show confirmation message to user

}
/*
* File: SimpleImage.php
* Author: Simon Jarvis
* Copyright: 2006 Simon Jarvis
* Date: 08/11/06
* Link: http://www.white-hat-web-design.co.uk/blog/resizing-images-with-php/
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details:
* http://www.gnu.org/licenses/gpl.html
*
*/

class SimpleImage
{

    var $image;
    var $image_type;

    function load($filename)
    {

        $image_info = getimagesize($filename);
        $this->image_type = $image_info[2];
        if ($this->image_type == IMAGETYPE_JPEG) {

            $this->image = imagecreatefromjpeg($filename);
        } elseif ($this->image_type == IMAGETYPE_GIF) {

            $this->image = imagecreatefromgif($filename);
        } elseif ($this->image_type == IMAGETYPE_PNG) {

            $this->image = imagecreatefrompng($filename);
        }
    }
    function save($filename, $image_type = IMAGETYPE_JPEG, $compression = 75, $permissions = null)
    {

        if ($image_type == IMAGETYPE_JPEG) {
            imagejpeg($this->image, $filename, $compression);
        } elseif ($image_type == IMAGETYPE_GIF) {

            imagegif($this->image, $filename);
        } elseif ($image_type == IMAGETYPE_PNG) {

            imagepng($this->image, $filename);
        }
        if ($permissions != null) {

            chmod($filename, $permissions);
        }
    }
    function output($image_type = IMAGETYPE_JPEG)
    {

        if ($image_type == IMAGETYPE_JPEG) {
            imagejpeg($this->image);
        } elseif ($image_type == IMAGETYPE_GIF) {

            imagegif($this->image);
        } elseif ($image_type == IMAGETYPE_PNG) {

            imagepng($this->image);
        }
    }
    function getWidth()
    {

        return imagesx($this->image);
    }
    function getHeight()
    {

        return imagesy($this->image);
    }
    function resizeToHeight($height)
    {

        $ratio = $height / $this->getHeight();
        $width = $this->getWidth() * $ratio;
        $this->resize($width, $height);
    }

    function resizeToWidth($width)
    {
        $ratio = $width / $this->getWidth();
        $height = $this->getheight() * $ratio;
        $this->resize($width, $height);
    }

    function scale($scale)
    {
        $width = $this->getWidth() * $scale / 100;
        $height = $this->getheight() * $scale / 100;
        $this->resize($width, $height);
    }

    function resize($width, $height)
    {
        $new_image = imagecreatetruecolor($width, $height);
        imagecopyresampled($new_image, $this->image, 0, 0, 0, 0, $width, $height, $this->getWidth(), $this->getHeight());
        $this->image = $new_image;
    }
}
