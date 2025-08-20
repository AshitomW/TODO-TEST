"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface SignUpProps {
  onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; max-age=604800`;
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}

      <FormInput
        label="Name"
        type="name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <FormInput
        label="Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="test@test.com"
      />

      <FormInput
        label="Password"
        type="password"
        required
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="123456"
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
