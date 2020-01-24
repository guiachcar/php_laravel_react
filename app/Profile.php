<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profiles';
    protected $fillable = ['nome','email','mensagem','telefone','arquivo','nome_arquivo','ip'];
}
