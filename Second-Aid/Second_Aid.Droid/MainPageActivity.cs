using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Second_Aid.Droid.Models;
using System.Threading.Tasks;

namespace Second_Aid.Droid
{
    [Activity(Label = "MainPageActivity")]
    public class MainPageActivity : Activity
    {
        private string token;
        private List<string> items = new List<string>();
        private List<string> idItems = new List<string>();

        private Dictionary<int, string> Pairs = new Dictionary<int, string>();

        internal static List<int> medicationId = new List<int>();

        protected override async void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            SetContentView(Resource.Layout.MainPageLayout);

            this.token = Intent.GetStringExtra(Constants.TOKEN_KEY) ?? "No token detected.";
            Android.Widget.Toast.MakeText(this, this.token, Android.Widget.ToastLength.Short).Show();

            ListView dataDisplay = FindViewById<ListView>(Resource.Id.data_listview);

            Button logoutBtn = FindViewById<Button>(Resource.Id.logout_button);
            logoutBtn.Click += (object sender, EventArgs args) =>
            {
                logout();
            };


            items = await getProcedureID();
            idItems = await getProcedure(items);

            var adapter = new ArrayAdapter<String>(this, Android.Resource.Layout.SimpleListItem1, idItems);
            dataDisplay.Adapter = adapter;

            dataDisplay.ItemClick += listviewClicked;


        }

        void listviewClicked(object sender, AdapterView.ItemClickEventArgs e)
        {
            Intent procedureActivityIntent = new Intent(this, typeof(ProcedureActivity));

            procedureActivityIntent.PutExtra(Constants.PROCEDURE_KEY, idItems[e.Position]);
            procedureActivityIntent.PutExtra(Constants.PROCEDUREID_KEY, items[e.Position]);
            procedureActivityIntent.PutExtra(Constants.TOKEN_KEY, token);

            StartActivity(procedureActivityIntent);
        }

        private async Task<List<string>> getProcedureID()
        {
            using (var client = new HttpClient())
            {

                client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", this.token));

                var response = await client.GetAsync(Constants.BASE_URL + Constants.GETPROCEDUREID_URL);

                var responseString = await response.Content.ReadAsStringAsync();

                var responseMArray = JsonConvert.DeserializeObject<List<PatientProcedures>>(responseString);

                List<string> data = new List<string>();

                foreach (var patientProcedures in responseMArray)
                {

                    if (!data.Contains(patientProcedures.procedureId))
                    {
                        data.Add(patientProcedures.procedureId);
                        medicationId.Add(patientProcedures.MedicationId);
                    }
                
                }

                return data; 
            }
        }

        private async Task<List<string>> getProcedure(List<string> id)
        {
            using (var client = new HttpClient())
            {
                // THIS DOESN'T WORK, even when encoding token => UTF8Bytes => Base64String
                // client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer ", this.token);
                client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", this.token));

                var response = await client.GetAsync(Constants.BASE_URL + Constants.PROCEDUREID_URL);

                var responseString = await response.Content.ReadAsStringAsync();

                var responseMArray = JsonConvert.DeserializeObject<List<Procedure>>(responseString);

                List<string> data = new List<string>();
                foreach (var patientProcedures in responseMArray)
                {
                    foreach (var checkName in id)
                    {
                        if (patientProcedures.procedureId.ToString().Equals(checkName))
                        {
                            data.Add(patientProcedures.name);
                        }
                    }                 

                }

                return data;
            }
        }


        public override void OnBackPressed()
        {
            logout();
        }

        private void logout()
        {
            // logout? connect/logout doesn't seem to work
            Finish();
        }

    }
}