"use client";

import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";

interface Props {
  children: React.ReactNode;
}
function AlertPopup({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  /** 전체 삭제 버튼 클릭 시 */
  const onDeleteAll = async () => {
    const { status } = await supabase
      .from("todos")
      .delete()
      .eq("id", Number(pathname.split("/")[2]));

    if (status === 204) {
      toast({
        title: "선택한 TODO-LIST가 삭제되었습니다.",
        description: "새로운 TASK가 생기시면 언제든 추가해주세요!",
      });
      router.push("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>해당 TASK를 정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 취소할 수 없습니다.
            <br /> 삭제가 진행되면 귀하의 게시물은 영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteAll} className="bg-red-600 hover:bg-rose-600">
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertPopup };
