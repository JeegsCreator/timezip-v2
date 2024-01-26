import { useSelectedCountries } from "@/context/useSelectedCountries";
import CountryItem from "./CountryItem";
import { ScrollArea } from "./ui/scroll-area";
import Plus from "./icons/Plus";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const SelectedCountriesList = () => {
  const { selectedCountries, unselectCountry, setSelectedCountries } =
    useSelectedCountries();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    setSelectedCountries((items) => {
      const oldIndex = items.findIndex((timezone) => timezone.id === active.id);
      const newIndex = items.findIndex((timezone) => timezone.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <div className="row-start-1 row-end-3 w-full">
      <h3 className="mb-3 text-lg font-semibold">Selected countries</h3>
      <ScrollArea className="h-[calc(100%-52px)] rounded-md border shadow-sm placeholder:text-zinc-600">
        <ul className="h-full">
          {selectedCountries.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedCountries}
                strategy={verticalListSortingStrategy}
              >
                {selectedCountries.map((timezone, i) => {
                  const capital = timezone.Timezone.find((t) => t.capital);

                  if (capital) {
                    return (
                      <CountryItem
                        key={timezone.id}
                        countryId={timezone.id}
                        countryCode={timezone.countryCode}
                        countryName={timezone.countryName}
                        timezoneOffset={capital?.offset}
                        onClick={() => unselectCountry(timezone.id)}
                        isSelected
                      />
                    );
                  }
                })}
              </SortableContext>
            </DndContext>
          ) : (
            <div className="grid h-full w-full place-content-center text-balance px-8 text-center">
              <div className="flex flex-col items-center text-zinc-500">
                <span className="text-4xl">
                  <Plus />
                </span>
                <p>Select a country to start</p>
              </div>
            </div>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default SelectedCountriesList;
