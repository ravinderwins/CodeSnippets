<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldRadiolistTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormFieldRadiolistTemplate" %>

<script id="form-field-radiolist-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="radiolist">
        <label class="control-label">${FieldCaption}</label>
        <span class="required {{if !Required || Required == 'false'}} hide {{/if}}">*</span>
        <span class="help-icon hide pull-right">
            <i class="glyphicon glyphicon-question-sign"></i>
        </span>
        <div class="radio-options">
            <div class="form-radio radio-single">
                <input class="form-radio-input radio-input fb-control" data-controltype="radiolist" data-name="${FieldName}" type="radio" data-fieldid="${FieldId}" data-fieldtype="${FieldTypeID}" data-dataformatstring="${DataFormatString}" data-maxlength="${Maxlength}" data-masktype="${MaskType}" data-maskformat="${Mask}" data-required="${Required}" data-allownullsexpressions="${AllowNullsExpressions}" data-readonly="${IsReadOnly}" data-readonlyexpressions="${ReadOnlyExpressions}" data-visibility="${VisibilityOption}" data-visibilityfield="${VisibilityField}" data-fieldoperator="${VisibilityFieldOperator}" data-visibilityfieldvalue="${VisibilityFieldValue}" data-visibilityexpressions="${VisibilityExpressions}" data-score="${ScoreExpr}" data-defaultvalue="${DefaultValue}" data-itemsdatacontroller="${ItemsDataController}" data-udcategory="${UDCategory}" data-itemsdatatextfield="${ItemsDataTextField}" data-itemsdatavaluefield="${ItemsDataValueField}" data-ismultiselect="${isMultiSelect}" data-formview="${FormViews}" data-defaultfield="${VFDIsVisible}" />
                <label class="form-radio-label radio-label">${FieldCaption}</label>
            </div>
        </div>
    </div>
</script>