import { type FC } from "react";
import { useSearchParams } from "react-router-dom";
import { usePlaces } from "../../utils/service";
import Loader from "../../components/loader";
import Error from "../../components/header/error";
import Card from "../../components/card";

const List: FC = () => {
  const [searchParams] = useSearchParams();
  const paramsObj = Object.fromEntries(searchParams.entries());
  const { isLoading, error, data, refetch } = usePlaces(paramsObj);

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} onRetry={refetch} />;

  return (
    <div className="mt-10">
      <h1 className="font-bold text-2xl">Yakınınızdaki Lokasyonlar</h1>
      <div className="grid gap-5 mt-5">
        {data?.map((place) => (
          <Card key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default List;
