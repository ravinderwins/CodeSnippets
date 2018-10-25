<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormOptionsTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormOptionsTemplate" %>

<script id='form-field-options-template' type='text/x-jquery-tmpl'>
    <div class='options-list'>
        {{each(i,v) options}}
        <div class='input-group opt-single'>
            <input type='text' class='form-control opt-value' data-field-property="newudoptions" value='${v}' />
            <span class='input-group-addon opt-remove'><i class='glyphicon glyphicon-remove'></i></span>
        </div>
        {{/each}}
    </div>
</script>