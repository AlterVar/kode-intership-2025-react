import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../app/hooks";
import { showError, showPeople } from "../app/features/loadingSlice";
import { RequestParamsType } from "../types/requestParamsType";
import { RefObject, useEffect, useRef } from "react";
import { PersonType } from "../types/PersonType";

function useAxios(params: RequestParamsType) {
  const dispatch = useAppDispatch();
  let isNeedUpdate = true;
  const people: RefObject<PersonType[] | null> = useRef(null);

  useEffect(() => {
    if (isNeedUpdate && people.current === null) {
      axios
        .get(
          "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users",
          {
            params: params,
          }
        )
        .then(function (response: AxiosResponse) {
          if (response && response.data.items.length > 0) {
            people.current = response.data.items;
            dispatch(showPeople());
          } else {
            //show filterError
          }
        })
        .catch(function () {
          dispatch(showError());
        });
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isNeedUpdate = false;
      };
    }
  }, []);

  return people;
}

export default useAxios;
