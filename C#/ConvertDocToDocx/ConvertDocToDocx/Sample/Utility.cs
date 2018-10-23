using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Word = Microsoft.Office.Interop.Word;


namespace ConvertDocToDocx.Sample
{
    public class Utility
    {
        string _sourcePath, _targetpath;

        public Utility(string SourcePath, string TargetPath)
        {
            _sourcePath = SourcePath;
            _targetpath = TargetPath;
        }
        public void ConvertDocument()
        {
            Word._Application application = new Word.Application();
            object fileformat = Word.WdSaveFormat.wdFormatXMLDocument;
            DirectoryInfo directory = new DirectoryInfo(@_sourcePath);
            foreach (FileInfo file in directory.GetFiles("*.doc", SearchOption.AllDirectories))
            {
                if (file.Extension.ToLower() == ".doc")
                {
                    object filename = file.FullName;
                    string newfilename = file.Name.Replace(".doc", ".docx");
                    Word._Document document = application.Documents.Open(filename);

                    document.Convert();
                    document.SaveAs2(_targetpath +'/'+ newfilename, fileformat);
                    document.Close();
                    document = null;
                }
            }
            application.Quit();
            application = null;
        }
    }
}
