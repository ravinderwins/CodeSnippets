using ConvertDocToDocx.Sample;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConvertDocToDocx
{
    class Program
    {
        static void Main(string[] args)
        {
            Utility merge = new Utility(ConfigurationSettings.AppSettings["SourcePath"], ConfigurationSettings.AppSettings["TargetPath"]);
            merge.ConvertDocument();


            Console.WriteLine("\n\nPress any key to exit.");
            Console.ReadKey();
        }
    }
}
