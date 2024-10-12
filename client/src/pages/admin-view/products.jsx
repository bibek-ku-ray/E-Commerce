import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { useState } from "react";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
};

import ProductImageUpload from "@/components/admin-view/image-upload";

const AdminProducts = () => {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] =
        useState(false);

    const [formData, setFormData] = useState(initialFormData)

    function onSubmit(){}
    return (
        <>
            <div className="flex justify-end w-full mb-5">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="gap-4 gird md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                    setOpenCreateProductsDialog(false);
                }}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add New Sheet</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload />
                    <div>
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={"Add"}
                            formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default AdminProducts;
