<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormFieldLookuplistTemplate.ascx.cs" Inherits="VisualFormBuilder.FormFieldLookuplistTemplate" %>

<script id="form-field-lookuplist-template" type="text/x-jquery-tmpl">
    <div class="form-group" data-control-type="${ControlType}">
        <label class="control-label">
            ${FieldCaption}
        </label>
        <span class="required {{if !Required || Required == 'false'}} hide {{/if}}">*</span>
        <div class="input-group">
            <input type="text" class="form-control fb-control" data-controltype="${ControlType}" data-fieldid="${FieldId}" data-name="${FieldName}" data-fieldtype="${FieldTypeID}" data-dataformatstring="${DataFormatString}" data-maxlength="${Maxlength}" data-masktype="${MaskType}" data-maskformat="${Mask}" data-required="${Required}" data-allownullsexpressions="${AllowNullsExpressions}" data-readonly="${IsReadOnly}" data-readonlyexpressions="${ReadOnlyExpressions}" data-visibility="${VisibilityOption}" data-visibilityfield="${VisibilityField}" data-fieldoperator="${VisibilityFieldOperator}" data-visibilityfieldvalue="${VisibilityFieldValue}" data-visibilityexpressions="${VisibilityExpressions}" data-score="${ScoreExpr}" data-defaultvalue="${DefaultValue}" data-itemsdatacontroller="${ItemsDataController}" data-udcategory="${UDCategory}" data-itemsdatatextfield="${ItemsDataTextField}" data-itemsdatavaluefield="${ItemsDataValueField}" data-ismultiselect="${isMultiSelect}" data-formview="${FormViews}" data-defaultfield="${VFDIsVisible}" />
            <div class="input-group-btn">
                <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
            </div>
        </div>
    </div>
</script>