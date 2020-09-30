<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ReferenceTableChangeFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->string('part_title',255)->nullable()->change();
            $table->string('relator',100)->nullable()->after("last_author");
            $table->string('thesis_type',20)->nullable()->after("relator");
            $table->string('degree_course',100)->nullable()->after("thesis_type");
            $table->string('series_title',100)->nullable()->after("degree_course");
            $table->string('geographic_area',100)->nullable()->after("series_title");
            $table->renameColumn('first_author','authors');
            $table->renameColumn('last_author','part_authors');
            $table->string('pages',15)->nullable()->after('issue');
            $table->dropColumn('page_start');
            $table->dropColumn('page_end');
            $table->string('acnp_cod',20)->nullable()->after('issue');
            $table->string('sbn_docid',20)->nullable()->after('issue');
            $table->string('oa_link',255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('references', function (Blueprint $table) {
            $table->renameColumn('authors','first_author');
            $table->renameColumn('part_authors','last_author');
            $table->dropColumn('relator');
            $table->dropColumn('thesis_type');
            $table->dropColumn('degree_course');
            $table->dropColumn('series_title');
            $table->dropColumn('geographic_area');
            $table->string('page_start',15)->nullable()->after('issue');
            $table->string('page_end',15)->nullable()->after('page_start');
            $table->dropColumn('acnp_cod');
            $table->dropColumn('sbn_docid');
            $table->dropColumn('oa_link');
        });
    }
}
