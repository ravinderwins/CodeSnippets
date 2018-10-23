using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordMergeUtility
{
    class Program
    {
        static void Main(string[] args)
        {
            DocumentMerge merge = new DocumentMerge(ConfigurationSettings.AppSettings["SourcePath"], ConfigurationSettings.AppSettings["TargetPath"]);
            merge.MergeDocument();


            Console.WriteLine("\n\nPress any key to exit.");
            Console.ReadKey();
        }
    }
}
