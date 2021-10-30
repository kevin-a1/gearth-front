import queryString from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();

  const params = useMemo(() => {
    
    const qParams = queryString.parse(location.search);
    console.log(qParams)
    return qParams;
  }, [location.search]);

  return params;
};

export default useQueryParams;