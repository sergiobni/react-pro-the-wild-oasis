import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

//Custom Hook for cabins
export function useDeleteCabin() {
  //For forcing invalidation so auto fetch
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: id => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('Cabin Successfully Deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: err => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
