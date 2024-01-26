import CountryItem from "./CountryItem";
import timezones from "@/timezones.json";
import Search from "./icons/Search";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import Empty from "./icons/Empty";
import { useSelectedCountries } from "@/context/useSelectedCountries";

const CountriesList = () => {
  const [searchValue, setSearchValue] = useState("");
  const { selectedCountries, selectCountry } = useSelectedCountries();

  const handleCountryClick = (countryId: number) => {
    return () => {
      selectCountry(countryId);
      setSearchValue("");
    };
  };

  const unselectedCountries = timezones.filter(
    (country) =>
      !selectedCountries.find(
        (selectedCountry) => selectedCountry.id === country.id,
      ),
  );

  const searchedCountries = unselectedCountries.filter((country) =>
    country.countryName
      .toLowerCase()
      .includes(searchValue.toLowerCase().trim()),
  );

  return (
    <div className="row-start-3 row-end-6 w-full">
      <div className="relative mb-1  flex items-center justify-start gap-6">
        <h3 className="mb-2 text-nowrap pt-1 text-lg font-semibold">
          Add a country
        </h3>
        <div className="absolute right-0 top-0 flex w-fit items-center">
          <div className="absolute left-4 text-zinc-600">
            <Search />
          </div>
          <Input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            id="search-country"
            maxLength={40}
            placeholder="Search"
            className="w-[100px] cursor-pointer text-ellipsis bg-white pl-10 transition-[width] focus-visible:w-[350px] focus-visible:cursor-text"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-48px)] rounded-md border shadow-sm placeholder:text-zinc-600">
        <ul className="h-full">
          {searchedCountries.length > 0 ? (
            searchedCountries.map((timezone, i) => {
              const capital = timezone.Timezone.find((t) => t.capital);

              if (capital) {
                return (
                  <CountryItem
                    key={timezone.id}
                    countryCode={timezone.countryCode}
                    countryName={timezone.countryName}
                    timezoneOffset={capital?.offset}
                    onClick={handleCountryClick(timezone.id)}
                  />
                );
              }
            })
          ) : (
            <div className="grid h-full w-full place-content-center text-balance px-8 text-center">
              <div className="flex flex-col items-center text-zinc-500">
                <span className="text-4xl">
                  <Empty />
                </span>
                <p>Not country "{searchValue}" founded.</p>
              </div>
            </div>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default CountriesList;
