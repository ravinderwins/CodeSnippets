<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldButtonTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormFieldButtonTemplate" %>

<script id="form-field-button-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="${ControlType}">
        <button class="btn btn-default" data-actiongroupid="${ActionGroupID}" data-actionscopeid="${ActionScopeID}" data-isflat="${IsFlat}" data-actiongroup="${ActionGroup}" data-headertext="${HeaderText}" data-commandname="${CommandName}" data-commandargument="${CommandArgument}">${HeaderText}</button>
    </div>
</script>