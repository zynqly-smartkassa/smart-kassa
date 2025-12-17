export interface HomeSection {
  title: string;
  color: string;
  buttons: string[];
}

export interface HomePageContent {
  pageTitle: string;
  pageSubtitle: string;
  sections: HomeSection[];
}

export const homeContent = {
  hello: "Servus, ",

  pageTitle: "Home",
  pageSubtitle: "Navigiere zu deinem Service",

  sections: [
    {
      title: "Fahrten",
      color: "bg-violet-400",
      image: "/fahrten.png",
      buttons: ["Boten Fahrt", "Personen Fahrt", "Start Fahrt", "End Fahrt"],
    },
    {
      title: "Berichte",
      color: "bg-red-400",
      image: "/bericht.png",
      buttons: ["Archiv", "Tagesbericht", "Wochenbericht", "Monatsbericht"],
    },
  ],
};
