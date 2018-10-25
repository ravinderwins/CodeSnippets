<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldCommonTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormFieldCommonTemplate" %>

<script id="form-field-common-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="${ControlType}">
        <label class="control-label">
            ${FieldCaption} 
        </label>
        <span class="required {{if !Required || Required  == 'false'}} hide {{/if}}">*</span>
        <input {{if ControlType == 'date'}} type="date" {{else}} {{if ControlType == 'datetime'}} type="datetime-local" {{else}} {{if ControlType == 'password'}} type="password" {{else}} type="text" {{/if}} {{/if}} {{/if}}" class="form-control fb-control" data-controltype="${ControlType}" data-fieldid="${FieldId}" data-name="${FieldName}" data-fieldtype="${FieldTypeID}" data-dataformatstring="${DataFormatString}" data-maxlength="${Maxlength}" data-masktype="${MaskType}" data-maskformat="${Mask}" data-required="${Required}" data-allownullsexpressions="${AllowNullsExpressions}" data-readonly="${IsReadOnly}" data-readonlyexpressions="${ReadOnlyExpressions}" data-visibility="${VisibilityOption}" data-visibilityfield="${VisibilityField}" data-fieldoperator="${VisibilityFieldOperator}" data-visibilityfieldvalue="${VisibilityFieldValue}" data-visibilityexpressions="${VisibilityExpressions}" data-score="${ScoreExpr}" data-defaultvalue="${DefaultValue}" data-itemsdatacontroller="${ItemsDataController}" data-udcategory="${UDCategory}" data-itemsdatatextfield="${ItemsDataTextField}" data-itemsdatavaluefield="${ItemsDataValueField}" data-ismultiselect="${isMultiSelect}" data-columns="${Columns}" data-rows="${Rows}" data-formview="${FormViews}" data-defaultfield="${VFDIsVisible}" />
    </div>
</script>