<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormLayoutSectionTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.form_layout_section_template" %>

<script id='form-layout-section-template' type='text/x-jquery-tmpl'>
    <div class="row" data-control-type="${ControlType}" data-categoryid="${CategoryID}" data-newcolumn="${NewColumn}" data-allowtab="${AllowTab}" data-tabid="${FieldTabID}" data-tabname="${TabName}">
        <fieldset>
            <legend>${CategoryName}</legend>
            <div class='col-sm-12'></div>
        </fieldset>
    </div>
</script>
