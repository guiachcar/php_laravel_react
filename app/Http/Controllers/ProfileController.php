<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Profile;

class ProfileController extends Controller
{
    /**
     * Display a page profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function profile()
    {
        return view('profile');
    }

    /**
     * Display a data profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function table()
    {
        return view('table');
    }

    /**
     * Save Image.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        $request->validate([
            'arquivo' => 'required|mimes:pdf,doc,docx,odt,txt|max:500000',
        ]);
        $fileName = time().'.'.$request->arquivo->extension();  
   
        $request->arquivo->move(public_path('uploads'), $fileName);
   
        return  response()->json($fileName);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Profile::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['ip'] = \Request ::ip();
        try{
            $response = Profile::create($data);
            if($response)
                return  response()->json('Sucesso');
            else
                return  response()->json('Erro ao cadastrar');
        }catch(\Exception $e){
            return  response()->json($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            Profile::update($request)->where('id',$id)->first();
            if($response)
                return  response()->json('Sucesso');
            else
                return  response()->json('Erro ao cadastrar');
        }catch(\Exception $e){
            return  response()->json($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
