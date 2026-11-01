"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Home() {
  return (
    <>
      {/* tabs  */}
      <div className="mx-auto my-5  max-w-141.5">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Active</TabsTrigger>
            <TabsTrigger value="analytics">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* textarea */}
      <div className="my-4 w-[327.2px] h-37.5">
        <Field>
          <FieldLabel htmlFor="textarea-message">Label</FieldLabel>
          <Textarea
            id="textarea-message"
            placeholder="Type your message here."
          />
        </Field>
      </div>
      {/* toast  */}
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        {/* 1. زر الرسالة المعلوماتية */}
        <Button
          onClick={() => toast.info("Informative message")}
          variant="outline"
          className="rounded-xl"
        >
          عرض رسالة معلوماتية (Info)
        </Button>

        {/* 2. زر رسالة النجاح */}
        <Button
          onClick={() => toast.success("Successful operation")}
          variant="outline"
          className="rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-50"
        >
          عرض رسالة نجاح (Success)
        </Button>

        {/* 3. زر رسالة الفشل */}
        <Button
          onClick={() => toast.error("Unsuccessful operation")}
          variant="outline"
          className="rounded-xl border-rose-300 text-rose-700 hover:bg-rose-50"
        >
          عرض رسالة فشل (Error)
        </Button>
      </div>
    </>
  );
}
