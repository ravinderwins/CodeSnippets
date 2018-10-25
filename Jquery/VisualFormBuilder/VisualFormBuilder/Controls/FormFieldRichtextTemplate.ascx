<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldRichtextTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormFieldRichtextTemplate" %>

<script id="form-field-richtext-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="${ControlType}">
        <label class="control-label">
            ${FieldCaption}
        </label>
        <span class="required {{if !Required || Required == 'false'}} hide {{/if}}">*</span>
        <textarea class="form-control fb-control" data-controltype="${ControlType}" data-name="${FieldName}" rows="4" data-fieldid="${FieldId}" data-fieldtype="${FieldTypeID}" data-dataformatstring="${DataFormatString}" data-maxlength="${Maxlength}" data-masktype="${Mask}" data-maskformat="${MaskType}" data-required="${Required}" data-allownullsexpressions="${AllowNullsExpressions}" data-readonly="${IsReadOnly}" data-readonlyexpressions="${ReadOnlyExpressions}" data-visibility="${VisibilityOption}" data-visibilityfield="${VisibilityField}" data-fieldoperator="${VisibilityFieldOperator}" data-visibilityfieldvalue="${VisibilityFieldValue}" data-visibilityexpressions="${VisibilityExpressions}" data-score="${ScoreExpr}" data-defaultvalue="${DefaultValue}" data-itemsdatacontroller="${ItemsDataController}" data-udcategory="${UDCategory}" data-itemsdatatextfield="${ItemsDataTextField}" data-itemsdatavaluefield="${ItemsDataValueField}" data-ismultiselect="${isMultiSelect}" data-formview="${FormViews}" data-defaultfield="${VFDIsVisible}"></textarea>
    </div>
</script>