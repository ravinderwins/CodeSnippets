<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldCheckboxTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormFieldCheckboxTemplate" %>

<script id="form-field-checkboxlist-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="checkboxlist">
        <div class="checkbox-options">
            <div class="form-check chk-single">
                <input class="form-check-input chk-input fb-control" data-controltype="checkboxlist" data-name="${FieldName}" type="checkbox" data-fieldid="${FieldId}" data-fieldtype="${FieldTypeID}" data-dataformatstring="${DataFormatString}" data-maxlength="${Maxlength}" data-masktype="${MaskType}" data-maskformat="${Mask}" data-required="${Required}" data-allownullsexpressions="${AllowNullsExpressions}" data-readonly="${IsReadOnly}" data-readonlyexpressions="${ReadOnlyExpressions}" data-visibility="${VisibilityOption}" data-visibilityfield="${VisibilityField}" data-fieldoperator="${VisibilityFieldOperator}" data-visibilityfieldvalue="${VisibilityFieldValue}" data-visibilityexpressions="${VisibilityExpressions}" data-score="${ScoreExpr}" data-defaultvalue="${DefaultValue}" data-itemsdatacontroller="${ItemsDataController}" data-udcategory="${UDCategory}" data-itemsdatatextfield="${ItemsDataTextField}" data-itemsdatavaluefield="${ItemsDataValueField}" data-ismultiselect="${isMultiSelect}" data-formview="${FormViews}" data-defaultfield="${VFDIsVisible}" />
                <label class="form-check-label chk-label control-label">${FieldCaption}</label>
            </div>
        </div>
    </div>
</script>