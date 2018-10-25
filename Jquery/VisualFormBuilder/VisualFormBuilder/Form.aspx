<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Form.aspx.cs" Inherits="VisualFormBuilder.Form" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Manage Forms</title>
    <!-- CSS -->
    <link href="../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Assets/css/style.css" rel="stylesheet" />

    <!-- Scripts -->
    <script src="../Assets/js/jquery/jquery.min.js"></script>
    <script src="../Assets/js/bootstrap/bootstrap.js"></script>
    <script src="Assets/js/jquery/jquery.validate.min.js"></script>
    <script src="../Assets/scripts/vfb.js"></script>

    <script>
        var jsonResponse = '<%=JsonResponse%>';
        var formType = '<%= _FormType %>';
        var rootFormId = '<%= _RootFormId %>';
    </script>
</head>
<body>
    <form id="formDetails" runat="server" class="form-horizontal">
        <div class="container">
            <div class="col-sm-offset-2 col-sm-10 mb-20">
                <h4><%= _FormId > 1 ? "Update" : "New" %> Form</h4>
                <label>Complete the form. Make sure to enter all required fields.</label>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="DropDownListFormType">Form Type <span class="required">*</span></label>
                <div class="col-sm-10">
                    <select name="DropDownListFormType" class="form-control" id="DropDownListFormType" required="required" onchange="checkFormType(this)">
                        <option value="">Select</option>
                    </select>
                    <input type="hidden" id="formID" />
                </div>
            </div>


            <div class="detail-form-type hide">
                <div class="form-group">
                    <label class="control-label col-sm-2" for="DropDownListParentFormName">Parent Form Name</label>
                    <div class="col-sm-10">
                        <select name="DropDownListParentFormName" class="form-control" id="DropDownListParentFormName" onchange="getMasterFormetails(this.value)">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="DropDownListDisplayStyle">Display Style</label>
                    <div class="col-sm-10">
                        <select name="DropDownListDisplayStyle" class="form-control" id="DropDownListDisplayStyle">
                            <option value="-1">Select</option>
                        </select>
                    </div>
                </div>
            </div>


            <div class="form-group">
                <label class="control-label col-sm-2" for="formLocation">Form Location <span class="required">*</span></label>
                <div class="col-sm-10">
                    <select name="DropDownListFormLocation" class="form-control except-field" id="DropDownListFormLocation" required="required">
                        <option value="">Select</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="formName">Form Name <span class="required">*</span></label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="formName" name="formName" required="required">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="formCategory">Form Category </label>
                <div class="col-sm-10">
                    <select name="DropDownListFormCategory" class="form-control except-field" id="DropDownListFormCategory">
                        <option value="">Select</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="version">Version</label>
                <div class="col-sm-10">
                    <input type="text" name="formVersion" class="form-control" id="formVersion" readonly="readonly" value="1.0">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="formDescription">Description</label>
                <div class="col-sm-10">
                    <textarea class="form-control" name="formDescription" id="formDescription" rows="4"></textarea>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-2" for="dependencyLevel">Dependency Level <span class="required">*</span></label>
                <div class="col-sm-10">
                    <select name="DropDownListDependencyLevel" class="form-control except-field" id="DropDownListDependencyLevel" required="required">
                        <option value="">Select</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="checkBoxIsEnableDraft" class="except-field" />
                            Is Enable Draft</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="checkBoxIsSignatureRouting" class="except-field" />
                            Is Signature Routing Enabled</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </form>
</body>
<script>
    $(document).ready(function () {
        $('#formDetails').validate({
            submitHandler: function (form) {
                saveFormDetails();
            }
        });
        getAllDropDowns(true);
    });
</script>
</html>

