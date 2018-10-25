<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FormEditor.aspx.cs" Inherits="VisualFormBuilder.FormEditor" %>

<%@ Register Src="~/Controls/FormLayoutSectionTemplate.ascx" TagPrefix="UC" TagName="FormLayoutSectionTemplate" %>
<%@ Register Src="~/Controls/FormFieldCommonTemplate.ascx" TagPrefix="UC" TagName="FormFieldCommonTemplate" %>
<%@ Register Src="~/Controls/FormFieldLookuplistTemplate.ascx" TagPrefix="UC" TagName="FormFieldLookuplistTemplate" %>
<%@ Register Src="~/Controls/FormFieldDropdownlistTemplate.ascx" TagPrefix="UC" TagName="FormFieldDropdownlistTemplate" %>
<%@ Register Src="~/Controls/FormFieldCheckboxTemplate.ascx" TagPrefix="UC" TagName="FormFieldCheckboxTemplate" %>
<%@ Register Src="~/Controls/FormFieldRadiolistTemplate.ascx" TagPrefix="UC" TagName="FormFieldRadiolistTemplate" %>
<%@ Register Src="~/Controls/FormFieldMultilinetextTemplate.ascx" TagPrefix="UC" TagName="FormFieldMultilinetextTemplate" %>
<%@ Register Src="~/Controls/FormFieldRichtextTemplate.ascx" TagPrefix="UC" TagName="FormFieldRichtextTemplate" %>
<%@ Register Src="~/Controls/FormOptionsTemplate.ascx" TagPrefix="UC" TagName="FormOptionsTemplate" %>
<%@ Register Src="~/Controls/FormSettingsTemplate.ascx" TagPrefix="UC" TagName="FormSettingsTemplate" %>
<%@ Register Src="~/Controls/FormLayoutTemplate.ascx" TagPrefix="UC" TagName="FormLayoutTemplate" %>
<%@ Register Src="~/Controls/FormFieldButtonTemplate.ascx" TagPrefix="UC" TagName="FormFieldButtonTemplate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Form Builder</title>

    <!-- CSS -->
    <link href="../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Assets/css/jquery/jquery.ui.theme.css" rel="stylesheet" />
    <link href="../Assets/css/style.css" rel="stylesheet" />

    <!-- Scripts -->
    <script src="../Assets/js/jquery/jquery.min.js"></script>
    <script src="../Assets/js/jquery/jquery.ui.min.js"></script>
    <script src="../Assets/js/jquery/jquery.tmpl.min.js"></script>
    <script src="../Assets/js/bootstrap/bootstrap.js"></script>
    <script src="../Assets/js/html2canvas/html2canvas.min.js"></script>
    <script src="../Assets/scripts/fbuilder.js"></script>
    <script src="../Assets/scripts/vfb.js"></script>

    <script>
        var formId =<%=_FormId%>;
        var formDetailsResponse = '<%= _FormDetailsResponse %>';
        var formFieldsResponse = '<%= _FormFieldsResponse %>';
        var defaultFormFieldsResponse = '<%=_DefaultFormFieldsResponse %>';
        var masterFormFieldsResponse = '<%= _MasterFormFieldResponse %>';
        var buttonFieldsResponse = '<%=_ButtonFieldsResponse %>';

        var fieldTypes = '<%=_FieldTypeJson%>';
        var fieldMaskTypes = '<%=_FieldMaskTypesJson%>';
        var fieldDataFormats = '<%=_FieldDataFormatsJson%>';
        var visibilityFieldOperators = '<%=_VisibilityFieldOperatorsJson%>';
        var itemsDataControllers = '<%= _FormFieldDataControllerResponse%>';
        var userDefinedCategories = '<%= _UserDefinedCategoriesReponse %>';
        var childFormsListResponse = '<%= _ChildFormsListResponse %>';
        var tableColumnListResponse = '<%= _TableColumnListResponse %>';
        var formActionScopesResponse = '<%= _FormActionScopesResponse %>';
        var formActionCommandsResponse = '<%= _FormActionCommandsResponse %>';
        var navigateFormsListResponse = '<%=_NavigateFormsListResponse%>';
        var commandArgumentsResponse = '<%=_CommandArgumentsResponse%>';
        
        /* Parse Values */

        formDetailsResponse = formDetailsResponse && formDetailsResponse != '' ? JSON.parse(formDetailsResponse) : '';
        formFieldsResponse = formFieldsResponse && formFieldsResponse != '' ? JSON.parse(formFieldsResponse) : '';
        defaultFormFieldsResponse = defaultFormFieldsResponse && defaultFormFieldsResponse != '' ? JSON.parse(defaultFormFieldsResponse) : '';
        masterFormFieldsResponse = masterFormFieldsResponse && masterFormFieldsResponse != '' ? JSON.parse(masterFormFieldsResponse) : '';
        buttonFieldsResponse = buttonFieldsResponse && buttonFieldsResponse != '' ? JSON.parse(buttonFieldsResponse) : '';
        fieldTypes = fieldTypes && fieldTypes != '' ? JSON.parse(fieldTypes) : '';
        fieldMaskTypes = fieldMaskTypes && fieldMaskTypes != '' ? JSON.parse(fieldMaskTypes) : '';
        fieldDataFormats = fieldDataFormats && fieldDataFormats != '' ? JSON.parse(fieldDataFormats) : '';
        visibilityFieldOperators = visibilityFieldOperators && visibilityFieldOperators != '' ? JSON.parse(visibilityFieldOperators) : '';
        itemsDataControllers = itemsDataControllers && itemsDataControllers != '' ? JSON.parse(itemsDataControllers) : '';
        userDefinedCategories = userDefinedCategories && userDefinedCategories != '' ? JSON.parse(userDefinedCategories) : '';
        childFormsListResponse = childFormsListResponse && childFormsListResponse != '' ? JSON.parse(childFormsListResponse) : '';
        tableColumnListResponse = tableColumnListResponse && tableColumnListResponse != '' ? JSON.parse(tableColumnListResponse) : '';
        formActionScopesResponse = formActionScopesResponse && formActionScopesResponse != '' ? JSON.parse(formActionScopesResponse) : '';
        formActionCommandsResponse = formActionCommandsResponse && formActionCommandsResponse != '' ? JSON.parse(formActionCommandsResponse) : '';
        navigateFormsListResponse = navigateFormsListResponse && navigateFormsListResponse != '' ? JSON.parse(navigateFormsListResponse) : '';
        commandArgumentsResponse = commandArgumentsResponse && commandArgumentsResponse != '' ? JSON.parse(commandArgumentsResponse) : '';
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="row">
            <div class="col-sm-2 col-md-2">

                <!--Begin FormBuilder Tool Menu-->
                <div class="controls-sidebar" id="form-tools-container">
                    <div class="panel-group mb-20" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseZero"><span class="glyphicon glyphicon-folder-close"></span>Layout Controls</a>
                                </h4>
                            </div>
                            <div id="collapseZero" class="panel-collapse collapse in">
                                <div class="panel-body">
                                    <table class="table form-tool-controls">
                                        <tr>
                                            <td class="form-group">
                                                <a class="layout-tool" href="javascript:void(0);" data-type="section">Section</a>
                                            </td>
                                        </tr>
                                        <%--<tr>
                                        <td class="form-group">
                                            <a class="layout-tool" href="javascript:void(0);" data-type="two-section">2 Columns Section</a>
                                        </td>
                                    </tr>--%>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><span class="glyphicon glyphicon-folder-close"></span>Form Controls</a>
                                </h4>
                            </div>
                            <div id="collapseOne" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <table class="table form-tool-controls">
                                        <tr>
                                            <td class="form-group">
                                                <a class="btn-tool" href="javascript:void(0);" data-type="button">Button</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="checkboxlist">Checkbox</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="currency">Currency</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="double">Double</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="e-sign">E-Sign</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="e-pin">E-Pin</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="date">Date</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="datetime">Date and Time</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="password">Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="radiolist">Radio button</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="dropdownlist">Dropdown</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="lookuplist">Lookup List</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="richtext">Rich Text</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="singlelinetext">Single Line Text</a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="form-group">
                                                <a class="form-tool" href="javascript:void(0);" data-type="multilinetext">Multi Line Text</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><span class="glyphicon glyphicon-folder-close"></span>Default Controls</a>
                                </h4>
                            </div>

                            <div id="collapseTwo" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <table class="table default-tool-controls"></table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--<div class="panel-group mb-20" id="accordionOne">
                    
                </div>
                <div class="panel-group mb-20 hide" id="accordionTwo">
                    
                </div>--%>
                </div>
                <!--End FormBuilderToolMenu-->
            </div>

            <div class="col-sm-7 col-md-7">
                <div id="btns-drag-area-container">
                    <div class="drag-drop-area btn-drop-area" id="btns-design-area" data-content="Drag button controls from the left side-bar into this space."></div>
                </div>
                <div class="clearfix"></div>
                <div id="drag-area-container"></div>

                <input type="hidden" id="isFormAltered" value="0" />
                <input type="hidden" id="formDesignerImage" />
            </div>

            <div class="col-sm-3 col-md-3">
                <div class="panel-group mb-20 hide" id="field-property-container">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#field-property-container" href="#collapseFieldProperties"><span class="glyphicon glyphicon-th"></span><span class="active-control-type">Field</span> Properties</a>
                            </h4>
                        </div>
                        <div id="collapseFieldProperties" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <table id="field-property-table" class="table-properties table">
                                    <!-- Field Description Properties -->
                                    <%--<tr>
                                        <td class="property-label" colspan="2">
                                            Field Description
                                        </td>
                                    </tr>--%>

                                    <!-- Layout Category Name -->
                                    <tr class="field-property layout-field-property">
                                        <td class="property-label">Category Name <span class="required">*</span>
                                        </td>
                                        <td class="property-input">
                                            <input data-field-property="categoryname" data-field-required="true" type="text" class="form-control" name="name" />
                                        </td>
                                    </tr>

                                    <tr class="field-property layout-field-property">
                                        <td class="property-label">New Column
                                        </td>
                                        <td class="property-input">
                                            <label class="radio-inline">
                                                <input type="radio" value="true" name="newcolumn" data-field-property="newcolumn" class="form-control" />
                                                Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="false" name="newcolumn" data-field-property="newcolumn" checked="checked" class="form-control" />
                                                No
                                            </label>
                                        </td>
                                    </tr>

                                    <tr class="field-property parent-property layout-field-property">
                                        <td class="property-label">Add Tab
                                        </td>
                                        <td class="property-input">
                                            <label class="radio-inline">
                                                <input type="radio" value="true" name="allowtab" data-field-property="allowtab" class="form-control" />
                                                Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="false" name="allowtab" data-field-property="allowtab" checked="checked" class="form-control" />
                                                No
                                            </label>
                                        </td>
                                    </tr>

                                    <tr class="field-property layout-field-property" data-child-property="allowtab">
                                        <td class="property-label">Tab Name
                                        </td>
                                        <td class="property-input">
                                            <input data-field-property="tabname" type="text" class="form-control" name="tabname" />
                                        </td>
                                    </tr>

                                    <!-- Button Properties -->
                                    <tr class="field-property button-field-property">
                                        <td class="property-label">Action Scope
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="actionscopeid" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (formActionScopesResponse && formActionScopesResponse.length != '') {
                                                        for (var i = 0; i < formActionScopesResponse.length; i++) {
                                                            document.write('<option value="' + formActionScopesResponse[i].ActionScopeID + '">' + formActionScopesResponse[i].ActionScope + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- Is Flat -->
                                    <tr class="field-property button-field-property">
                                        <td class="property-label"> Is Flat
                                        </td>
                                        <td class="property-input">
                                            <label class="radio-inline">
                                                <input type="radio" value="true" name="isflat" data-field-property="isflat" class="form-control" /> Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="false" name="isflat" data-field-property="isflat" class="form-control" checked="checked" /> No
                                            </label>
                                        </td>
                                    </tr>

                                    <!-- Action Group Operator -->
                                    <tr class="field-property button-field-property">
                                        <td class="property-label">Action Group
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="actiongroup" class="form-control">
                                                <option value="">Please Select</option>
                                                <option value="ag2">Form</option>
                                                <option value="ag4">ActionBar</option>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- Header Text -->
                                    <tr class="field-property button-field-property">
                                        <td class="property-label">Header Text <span class="required">*</span>
                                        </td>
                                        <td class="property-input">
                                            <input data-field-property="headertext" data-field-required="true" type="text" class="form-control" name="headertext" />
                                        </td>
                                    </tr>

                                    <!-- Command Name -->
                                    <tr class="field-property button-field-property">
                                        <td class="property-label">Command Name
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="commandname" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (formActionCommandsResponse && formActionCommandsResponse.length != '') {
                                                        for (var i = 0; i < formActionCommandsResponse.length; i++) {
                                                            document.write('<option value="' + formActionCommandsResponse[i].ActionCommandID + '">' + formActionCommandsResponse[i].ActionCommand + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- Command Name -->
                                    <tr class="field-property button-field-property">
                                        <td class="property-label">Command Argument</td>
                                        <td class="property-input">
                                            <div class="input-group">
                                                <input data-field-property="commandargument" type="text" class="form-control" name="commandargument" disabled="disabled" />
                                                <a class="input-group-addon action-button" href="javascript:void(0)" data-action="commandargumentdialog"><strong>...</strong></a>
                                             </div>
                                        </td>
                                    </tr>

                                    <!-- Field Name -->
                                    <tr class="field-property">
                                        <td class="property-label">
                                            Field Name <span class="required">*</span>
                                        </td>
                                        <td class="property-input">
                                            <input id="name" data-field-property="name" data-field-required="true" type="text" class="form-control" name="name" />
                                        </td>
                                    </tr>

                                    <!-- Field Type -->
                                    <tr class="field-property parent-property value-based">
                                        <td class="property-label">Field Type <span class="required">*</span>
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="fieldtype" data-field-required="true" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (fieldTypes && fieldTypes.length != '') {
                                                        for (var i = 0; i < fieldTypes.length; i++) {
                                                            document.write('<option value="' + fieldTypes[i].FieldTypeID + '">' + fieldTypes[i].FieldTypeDescription + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>
                                    <!-- Data Format String -->
                                    <tr data-child-property="fieldtype" class="field-property data-fieldtype-date data-fieldtype-dateandtime data-fieldtype-currency">
                                        <td class="property-label">Data Format String 
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="dataformatstring" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (fieldDataFormats && fieldDataFormats != '') {
                                                        for (var i = 0; i < fieldDataFormats.length; i++) {
                                                            document.write('<option value="' + fieldDataFormats[i].FieldDataFormatStringID + '">' + fieldDataFormats[i].DataFormatString + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>
                                    <!-- Field Length -->
                                    <tr data-child-property="fieldtype" class="field-property data-fieldtype-string data-fieldtype-e-pin">
                                        <td class="property-label">Field Length
                                        </td>
                                        <td class="property-input">
                                            <input id="maxcharacters" data-field-property="maxlength" type="text" class="form-control" name="maxcharacters" />
                                        </td>
                                    </tr>

                                    <!-- label -->
                                    <tr class="field-property">
                                        <td class="property-label">Label <span class="required">*</span>
                                        </td>
                                        <td class="property-input">
                                            <input id="label" data-field-property="label" data-field-required="true" type="text" class="form-control" name="label" />
                                        </td>
                                    </tr>

                                    <!-- Mask Type -->
                                    <tr class="field-property parent-property">
                                        <td class="property-label">Mask Type
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="masktype" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (fieldMaskTypes && fieldMaskTypes != '') {
                                                        for (var i = 0; i < fieldMaskTypes.length; i++) {
                                                            document.write('<option value="' + fieldMaskTypes[i].MaskType + '">' + fieldMaskTypes[i].MaskType + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>
                                    <!-- Mask Format -->
                                    <tr data-child-property="masktype" class="field-property">
                                        <td class="property-label">Mask Format
                                        </td>
                                        <td class="property-input">
                                            <input data-field-property="maskformat" type="text" class="form-control" name="maskformat" />
                                        </td>
                                    </tr>

                                    <!-- End of Field Description Properties -->

                                    <!-- Field Description Properties -->
                                    <%--<tr>
                                    <td class="property-label" colspan="2">
                                        Field Properties
                                    </td>
                                </tr>--%>

                                    <!-- Required -->
                                    <tr class="field-property parent-property value-based">
                                        <td class="property-label">Mandatory
                                        </td>
                                        <td class="property-input">
                                            <label class="radio-inline">
                                                <input type="radio" value="true" name="required" data-field-property="required" checked="checked" class="form-control" />
                                                Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="false" name="required" data-field-property="required" class="form-control" />
                                                No
                                            </label>
                                        </td>
                                    </tr>

                                    <!-- Mandatory Expressions -->
                                    <tr data-child-property="required" class="data-required-false">
                                        <td colspan="2" class="property-label">Mandatory Expressions
                                        </td>
                                    </tr>
                                    <tr data-child-property="required" class="field-property data-required-false">
                                        <td colspan="2" class="property-input">
                                            <textarea class="form-control mh-60" rows="10" data-field-property="allownullsexpressions"></textarea>
                                        </td>
                                    </tr>

                                    <!-- Read Only -->
                                    <tr class="field-property parent-property value-based">
                                        <td class="property-label">Read-only
                                        </td>
                                        <td class="property-input">
                                            <label class="radio-inline">
                                                <input type="radio" value="true" name="readonly" data-field-property="readonly" checked="checked" class="form-control" />
                                                Yes
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="false" name="readonly" data-field-property="readonly" class="form-control" />
                                                No
                                            </label>
                                        </td>
                                    </tr>

                                    <!-- ReadOnly Expressions -->
                                    <tr data-child-property="readonly" class="data-readonly-false">
                                        <td colspan="2" class="property-label">Read-only Expressions
                                        </td>
                                    </tr>
                                    <tr data-child-property="readonly" class="field-property data-readonly-false">
                                        <td colspan="2" class="property-input">
                                            <textarea class="form-control mh-60" rows="10" data-field-property="readonlyexpressions"></textarea>
                                        </td>
                                    </tr>

                                    <!-- Visibility Option -->
                                    <tr>
                                        <td class="property-label" colspan="2">Visibility Option
                                        </td>
                                    </tr>
                                    <tr class="field-property parent-property value-based">
                                        <td class="property-input" colspan="2">
                                            <label class="radio-inline">
                                                <input type="radio" value="" name="visibility" data-field-property="visibility" checked="checked" class="form-control" />
                                                N/A
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="1" name="visibility" data-field-property="visibility" class="form-control" />
                                                Single
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="2" name="visibility" data-field-property="visibility" class="form-control" />
                                                Multiple
                                            </label>
                                        </td>
                                    </tr>

                                    <!-- Visibility Field -->
                                    <tr data-child-property="visibility" class="field-property data-visibility-1">
                                        <td class="property-label">Visibility Field
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="visibilityfield" class="form-control">
                                                <option value="">Please Select</option>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- Field Operator -->
                                    <tr data-child-property="visibility" class="field-property data-visibility-1">
                                        <td class="property-label">Field Operator
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="fieldoperator" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (visibilityFieldOperators && visibilityFieldOperators != '') {
                                                        for (var i = 0; i < visibilityFieldOperators.length; i++) {
                                                            document.write('<option value="' + visibilityFieldOperators[i].VisibilityFieldOperatorID + '">' + visibilityFieldOperators[i].VisiblityFieldCondition + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- Field Visibility Option -->
                                    <tr data-child-property="visibility" class="field-property data-visibility-1">
                                        <td class="property-label">Field Value
                                        </td>
                                        <td class="property-input">
                                            <input type="text" data-field-property="visibilityfieldvalue" class="form-control" />
                                        </td>
                                    </tr>

                                    <!-- Visibility Expressions -->
                                    <tr data-child-property="visibility" class="data-visibility-2">
                                        <td colspan="2" class="property-label">Visibility Expressions
                                        </td>
                                    </tr>
                                    <tr data-child-property="visibility" class="field-property data-visibility-2">
                                        <td colspan="2" class="property-input">
                                            <textarea class="form-control mh-60" rows="10" data-field-property="visibilityexpressions"></textarea>
                                        </td>
                                    </tr>

                                    <!-- Score -->
                                    <tr>
                                        <td colspan="2" class="property-label">Score
                                        </td>
                                    </tr>
                                    <tr class="field-property">
                                        <td colspan="2" class="property-input">
                                            <textarea class="form-control mh-60" rows="10" data-field-property="score"></textarea>
                                        </td>
                                    </tr>

                                    <!-- Columns Value -->
                                    <tr class="field-property">
                                        <td class="property-label">Columns
                                        </td>
                                        <td class="property-input">
                                            <input type="text" data-field-property="columns" class="form-control" />
                                        </td>
                                    </tr>

                                    <!-- Rows Value -->
                                    <tr class="field-property field-specific-property multilinetext">
                                        <td class="property-label">Rows
                                        </td>
                                        <td class="property-input">
                                            <input type="text" data-field-property="rows" class="form-control" />
                                        </td>
                                    </tr>

                                    <!-- Default Value -->
                                    <tr class="field-property">
                                        <td class="property-label">Default Value
                                        </td>
                                        <td class="property-input">
                                            <input type="text" data-field-property="defaultvalue" class="form-control" />
                                        </td>
                                    </tr>

                                    <!-- ItemDataController -->
                                    <tr data-child-property="fieldtype" class="field-property parent-property single-value-based data-fieldtype-integer" data-single-value="s_userdefinedoptions">
                                        <td class="property-label">Data Category
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="itemsdatacontroller" class="form-control">
                                                <option value="">Please Select</option>
                                                <option value="s_UserDefinedOptions">s_UserDefinedOptions</option>
                                                <script type="text/javascript">
                                                    if (itemsDataControllers && itemsDataControllers != '') {
                                                        for (var i = 0; i < itemsDataControllers.length; i++) {
                                                            document.write('<option value="' + itemsDataControllers[i].name + '">' + itemsDataControllers[i].name + '</option>');
                                                        }
                                                    }
                                                </script>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- User Defined Category -->
                                    <tr data-child-property="itemsdatacontroller" class="field-property parent-property value-based data-itemsdatacontroller-s_userdefinedoptions">
                                        <td class="property-label">User Defined Category
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="udcategory" class="form-control">
                                                <option value="">Please Select</option>
                                                <script type="text/javascript">
                                                    if (userDefinedCategories && userDefinedCategories != '') {
                                                        for (var i = 0; i < userDefinedCategories.length; i++) {
                                                            document.write('<option value="' + userDefinedCategories[i].UDCategory + '">' + userDefinedCategories[i].UDCategory + '</option>');
                                                        }
                                                    }
                                                </script>
                                                <option value="-1">Other</option>
                                            </select>
                                        </td>
                                    </tr>

                                    <!-- New UD Category Name -->
                                    <tr data-child-property="udcategory" class="field-property data-udcategory-other">
                                        <td class="property-label">New UD Category
                                        </td>
                                        <td class="property-input">
                                            <input type="text" name="newudcategoryname" data-field-property="newudcategoryname" class="form-control" />
                                        </td>
                                    </tr>

                                    <!-- New UD Options -->
                                    <tr data-child-property="udcategory" class="data-udcategory-other">
                                        <td class="property-label">New UD Options
                                        </td>
                                        <td class="property-input" align="right">
                                            <a class='btn btn-primary btn-xs opt-add'>+ Add Option</a>
                                        </td>
                                    </tr>

                                    <tr data-child-property="udcategory" class="field-property options-property data-udcategory-other">
                                        <td class='property-input' colspan='2'></td>
                                    </tr>

                                    <!-- ItemsDataTextField -->
                                    <tr data-child-property="itemsdatacontroller" class="field-property data-itemsdatacontroller-other">
                                        <td class="property-label">Data Text
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="itemsdatatextfield" class="form-control"></select>
                                        </td>
                                    </tr>

                                    <!-- ItemsDataValueField -->
                                    <tr data-child-property="itemsdatacontroller" class="field-property data-itemsdatacontroller-other">
                                        <td class="property-label">Data Value
                                        </td>
                                        <td class="property-input">
                                            <select data-field-property="itemsdatavaluefield" class="form-control"></select>
                                        </td>
                                    </tr>

                                    <!-- Multi select -->
                                    <tr data-child-property="itemsdatacontroller" class="field-property data-itemsdatacontroller-other data-itemsdatacontroller-s_userdefinedoptions">
                                        <td class="property-label">Multi Select
                                        </td>
                                        <td class="property-input">
                                            <label class="radio-inline">
                                                <input type="radio" value="" name="ismultiselect" data-field-property="ismultiselect" checked="checked" class="form-control" />
                                                N/A
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="false" name="ismultiselect" data-field-property="ismultiselect" class="form-control" />
                                                No
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="true" name="ismultiselect" data-field-property="ismultiselect" class="form-control" />
                                                Yes
                                            </label>
                                        </td>
                                    </tr>

                                    <!-- Form Views -->
                                    <tr>
                                        <td class="property-label" colspan="2">Form Views
                                        </td>
                                    </tr>
                                    <tr class="field-property">
                                        <td class="property-input" colspan="2">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" value="grid" name="formview" data-field-property="formview" checked="checked" class="form-control" />
                                                Grid
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" value="create" name="formview" data-field-property="formview" checked="checked" class="form-control" />
                                                Create
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" value="edit" name="formview" data-field-property="formview" checked="checked" class="form-control" />
                                                Edit
                                            </label>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div id="AddFormPopup" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Create as new child form or link to existing form?</h4>
                    </div>
                    <div class="modal-body hide">
                        <div class="alert hide message-box"></div>
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label col-sm-3" for="form">Form :</label>
                                <div class="col-sm-9">
                                    <select class="form-control" name="form" id="ChildFormID" data-required="true">
                                        <option value="">Please Select</option>
                                        <script type="text/javascript">
                                            if (childFormsListResponse && childFormsListResponse != '') {
                                                for (var i = 0; i < childFormsListResponse.length; i++) {
                                                    document.write('<option value="' + childFormsListResponse[i].FormID + '">' + childFormsListResponse[i].FormName + '</option>');
                                                }
                                            }
                                        </script>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-3" for="RelationshipToParent">Relationship :</label>
                                <div class="col-sm-9">
                                    <select class="form-control" name="relationship" id="RelationshipToParent" data-required="true">
                                        <option value="">Please Select</option>
                                        <option value="add_foregin_key">Add Foreign Key</option>
                                        <script type="text/javascript">
                                            if (tableColumnListResponse && tableColumnListResponse != '') {
                                                for (var i = 0; i < tableColumnListResponse.length; i++) {
                                                    document.write('<option value="' + tableColumnListResponse[i].ColumnName + '">' + tableColumnListResponse[i].ColumnName + '</option>');
                                                }
                                            }
                                        </script>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-10">
                                    <button type="button" class="btn btn-primary" onclick="CreateChildForm()">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <div class="pull-left">
                            <button type="button" class="btn btn-primary" onclick="RedirectToFormPage()">Create Form</button>
                            <button type="button" class="btn btn-success" onclick="LinkToExistingForm(this)">Use Existing Forms</button>
                        </div>
                        <div class="pull-right">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="CommandArgumentPopup" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Generate Command Argument</h4>
                    </div>
                    <div class="modal-body">
                        <div class="alert hide message-box"></div>
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label col-sm-4">Navigate To <span class="required">*</span> :</label>
                                <div class="col-sm-8">
                                    <select class="form-control" name="arg_navigationform" data-required="true" data-field="Navigation Form">
                                        <option value="">Please Select</option>
                                        <script type="text/javascript">
                                            if (navigateFormsListResponse && navigateFormsListResponse != '') {
                                                for (var i = 0; i < navigateFormsListResponse.length; i++) {
                                                    document.write('<option value="' + navigateFormsListResponse[i].BaseTableName + '">' + navigateFormsListResponse[i].FormName + '</option>');
                                                }
                                            }
                                        </script>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-4">Command Name <span class="required">*</span>:</label>
                                <div class="col-sm-8">
                                    <select class="form-control" name="arg_commandname" data-required="true" data-field="Command Name">
                                        <option value="">Please Select</option>
                                        <script type="text/javascript">
                                            if (formActionCommandsResponse && formActionCommandsResponse.length != '') {
                                                for (var i = 0; i < formActionCommandsResponse.length; i++) {
                                                    document.write('<option value="' + formActionCommandsResponse[i].ActionCommandID + '">' + formActionCommandsResponse[i].ActionCommand + '</option>');
                                                }
                                            }
                                        </script>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-4">Command Argument <span class="required">*</span>:</label>
                                <div class="col-sm-8">
                                    <select class="form-control" name="arg_commandargument" data-required="true" data-field="Command Argument">
                                        <option value="">Please Select</option>
                                        <script type="text/javascript">
                                            if (commandArgumentsResponse && commandArgumentsResponse.length != '') {
                                                for (var i = 0; i < commandArgumentsResponse.length; i++) {
                                                    document.write('<option value="' + commandArgumentsResponse[i].TemplateName + '">' + commandArgumentsResponse[i].TemplateName + '</option>');
                                                }
                                            }
                                        </script>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-sm-offset-4 col-sm-10">
                                    <button type="button" class="btn btn-primary action-button" data-action="generatecmdargumenturl">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Register Controls -->

        <!-- Layout Controls -->
        <UC:FormLayoutSectionTemplate runat="server" id="FormLayoutSectionTemplate" />

        <!-- Form Controls -->
        <UC:FormFieldCommonTemplate runat="server" id="FormFieldCommonTemplate" />
        <UC:FormFieldLookuplistTemplate runat="server" id="FormFieldLookuplistTemplate" />
        <UC:FormFieldDropdownlistTemplate runat="server" id="FormFieldDropdownlistTemplate" />
        <UC:FormFieldCheckboxTemplate runat="server" id="FormFieldCheckboxTemplate" />
        <UC:FormFieldRadiolistTemplate runat="server" id="FormFieldRadiolistTemplate" />
        <UC:FormFieldMultilinetextTemplate runat="server" id="FormFieldMultilinetextTemplate" />
        <UC:FormFieldRichtextTemplate runat="server" id="FormFieldRichtextTemplate" />
        <UC:FormFieldButtonTemplate runat="server" id="FormFieldButtonTemplate" />

        <!-- Options Template -->
        <UC:FormOptionsTemplate runat="server" id="FormOptionsTemplate" />

        <!-- Settings Template -->
        <UC:FormSettingsTemplate runat="server" id="FormSettingsTemplate" />
        
        <!-- Layout Template -->
        <UC:FormLayoutTemplate runat="server" id="FormLayoutTemplate" />

        <script>
            forms.init();
        </script>
    </form>
</body>
</html>
