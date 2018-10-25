<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldDropdownlistTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormFieldDropdownlistTemplate" %>

<script id="form-field-dropdownlist-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="dropdownlist">
        <label class="control-label">${FieldCaption}</label>
        <span class="required {{if !Required || Required == 'false'}} hide {{/if}}">*</span>

        <select class="form-control fb-control" data-controltype="dropdownlist" data-name="${FieldName}" data-fieldid="${FieldId}" data-fieldtype="${FieldTypeID}" data-dataformatstring="${DataFormatString}" data-maxlength="${Maxlength}" data-masktype="${MaskType}" data-maskformat="${Mask}" data-required="${Required}" data-allownullsexpressions="${AllowNullsExpressions}" data-readonly="${IsReadOnly}" data-readonlyexpressions="${ReadOnlyExpressions}" data-visibility="${VisibilityOption}" data-visibilityfield="${VisibilityField}" data-fieldoperator="${VisibilityFieldOperator}" data-visibilityfieldvalue="${VisibilityFieldValue}" data-visibilityexpressions="${VisibilityExpressions}" data-score="${ScoreExpr}" data-defaultvalue="${DefaultValue}" data-itemsdatacontroller="${ItemsDataController}" data-udcategory="${UDCategory}" data-itemsdatatextfield="${ItemsDataTextField}" data-itemsdatavaluefield="${ItemsDataValueField}" data-ismultiselect="${isMultiSelect}" data-formview="${FormViews}" {{if isMultiSelect == true}} multiple {{/if}}>
            <option>Select</option>
            {{each(i,v) options}}
            <option value="${v.value}">${v.label}</option>
            {{/each}}
        </select>
    </div>
</script>