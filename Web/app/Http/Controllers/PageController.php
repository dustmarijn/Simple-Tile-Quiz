<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(['pages' => Page::with('tiles')->get()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if($request->title) { // Checks if the title of the adminpage is requested.

            $page = new Page(); // Creates new adminpage.
            $page->title = $request->title; // Title of the adminpage.
            if($request->path) { // Checks if the adminpage path from the adminpage is requested.
                if(!Page::all()->where('path', $request->path)) {

                    $page->path = $request->path; // Sets the path of the adminpage to the requested path.
                    if ($request->able_to_use) { // Checks if the able to use of the adminpage is requested.

                        $page->able_to_use = $request->able_to_use; // Sets the able to use of the requested able to use.
                        $page->save(); // Saves the adminpage in the database.

                        return response(['succesMessage' => 'Pagina succesvol aangemaakt!']);
                    } else {
                        return response(['errorMessage' => 'Pagina kon niet worden aangemaakt, je moet aangeven of de pagina kan worden gebruikt!']);
                    }
                } else {
                    return response(['errorMessage' => 'Pagina kon niet worden aangemaakt, er is al een pagina die naar dit pad gaat!']);
                }
            } else {
                return response(['errorMessage' => 'Pagina kon niet worden aangemaakt, je moet een pad aangeven waar deze pagina komt!']);
            }
        } else {
            return response(['errorMessage' => 'Pagina kon niet worden aangemaakt, je moet wel een titel toevoegen!']);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $page = Page::all()->where('id', $request->id);

        return response(['adminpage' => $page]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        //
    }
}
